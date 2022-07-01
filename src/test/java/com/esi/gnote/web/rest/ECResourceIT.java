package com.esi.gnote.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.esi.gnote.IntegrationTest;
import com.esi.gnote.domain.EC;
import com.esi.gnote.repository.ECRepository;
import com.esi.gnote.service.dto.ECDTO;
import com.esi.gnote.service.mapper.ECMapper;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link ECResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ECResourceIT {

    private static final String DEFAULT_NOM_EC = "AAAAAAAAAA";
    private static final String UPDATED_NOM_EC = "BBBBBBBBBB";

    private static final Integer DEFAULT_COEFF = 1;
    private static final Integer UPDATED_COEFF = 2;

    private static final String ENTITY_API_URL = "/api/ecs";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ECRepository eCRepository;

    @Autowired
    private ECMapper eCMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restECMockMvc;

    private EC eC;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EC createEntity(EntityManager em) {
        EC eC = new EC().nomEC(DEFAULT_NOM_EC).coeff(DEFAULT_COEFF);
        return eC;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EC createUpdatedEntity(EntityManager em) {
        EC eC = new EC().nomEC(UPDATED_NOM_EC).coeff(UPDATED_COEFF);
        return eC;
    }

    @BeforeEach
    public void initTest() {
        eC = createEntity(em);
    }

    @Test
    @Transactional
    void createEC() throws Exception {
        int databaseSizeBeforeCreate = eCRepository.findAll().size();
        // Create the EC
        ECDTO eCDTO = eCMapper.toDto(eC);
        restECMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(eCDTO)))
            .andExpect(status().isCreated());

        // Validate the EC in the database
        List<EC> eCList = eCRepository.findAll();
        assertThat(eCList).hasSize(databaseSizeBeforeCreate + 1);
        EC testEC = eCList.get(eCList.size() - 1);
        assertThat(testEC.getNomEC()).isEqualTo(DEFAULT_NOM_EC);
        assertThat(testEC.getCoeff()).isEqualTo(DEFAULT_COEFF);
    }

    @Test
    @Transactional
    void createECWithExistingId() throws Exception {
        // Create the EC with an existing ID
        eC.setId(1L);
        ECDTO eCDTO = eCMapper.toDto(eC);

        int databaseSizeBeforeCreate = eCRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restECMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(eCDTO)))
            .andExpect(status().isBadRequest());

        // Validate the EC in the database
        List<EC> eCList = eCRepository.findAll();
        assertThat(eCList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNomECIsRequired() throws Exception {
        int databaseSizeBeforeTest = eCRepository.findAll().size();
        // set the field null
        eC.setNomEC(null);

        // Create the EC, which fails.
        ECDTO eCDTO = eCMapper.toDto(eC);

        restECMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(eCDTO)))
            .andExpect(status().isBadRequest());

        List<EC> eCList = eCRepository.findAll();
        assertThat(eCList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkCoeffIsRequired() throws Exception {
        int databaseSizeBeforeTest = eCRepository.findAll().size();
        // set the field null
        eC.setCoeff(null);

        // Create the EC, which fails.
        ECDTO eCDTO = eCMapper.toDto(eC);

        restECMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(eCDTO)))
            .andExpect(status().isBadRequest());

        List<EC> eCList = eCRepository.findAll();
        assertThat(eCList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllECS() throws Exception {
        // Initialize the database
        eCRepository.saveAndFlush(eC);

        // Get all the eCList
        restECMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(eC.getId().intValue())))
            .andExpect(jsonPath("$.[*].nomEC").value(hasItem(DEFAULT_NOM_EC)))
            .andExpect(jsonPath("$.[*].coeff").value(hasItem(DEFAULT_COEFF)));
    }

    @Test
    @Transactional
    void getEC() throws Exception {
        // Initialize the database
        eCRepository.saveAndFlush(eC);

        // Get the eC
        restECMockMvc
            .perform(get(ENTITY_API_URL_ID, eC.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(eC.getId().intValue()))
            .andExpect(jsonPath("$.nomEC").value(DEFAULT_NOM_EC))
            .andExpect(jsonPath("$.coeff").value(DEFAULT_COEFF));
    }

    @Test
    @Transactional
    void getNonExistingEC() throws Exception {
        // Get the eC
        restECMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewEC() throws Exception {
        // Initialize the database
        eCRepository.saveAndFlush(eC);

        int databaseSizeBeforeUpdate = eCRepository.findAll().size();

        // Update the eC
        EC updatedEC = eCRepository.findById(eC.getId()).get();
        // Disconnect from session so that the updates on updatedEC are not directly saved in db
        em.detach(updatedEC);
        updatedEC.nomEC(UPDATED_NOM_EC).coeff(UPDATED_COEFF);
        ECDTO eCDTO = eCMapper.toDto(updatedEC);

        restECMockMvc
            .perform(
                put(ENTITY_API_URL_ID, eCDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(eCDTO))
            )
            .andExpect(status().isOk());

        // Validate the EC in the database
        List<EC> eCList = eCRepository.findAll();
        assertThat(eCList).hasSize(databaseSizeBeforeUpdate);
        EC testEC = eCList.get(eCList.size() - 1);
        assertThat(testEC.getNomEC()).isEqualTo(UPDATED_NOM_EC);
        assertThat(testEC.getCoeff()).isEqualTo(UPDATED_COEFF);
    }

    @Test
    @Transactional
    void putNonExistingEC() throws Exception {
        int databaseSizeBeforeUpdate = eCRepository.findAll().size();
        eC.setId(count.incrementAndGet());

        // Create the EC
        ECDTO eCDTO = eCMapper.toDto(eC);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restECMockMvc
            .perform(
                put(ENTITY_API_URL_ID, eCDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(eCDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the EC in the database
        List<EC> eCList = eCRepository.findAll();
        assertThat(eCList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchEC() throws Exception {
        int databaseSizeBeforeUpdate = eCRepository.findAll().size();
        eC.setId(count.incrementAndGet());

        // Create the EC
        ECDTO eCDTO = eCMapper.toDto(eC);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restECMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(eCDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the EC in the database
        List<EC> eCList = eCRepository.findAll();
        assertThat(eCList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamEC() throws Exception {
        int databaseSizeBeforeUpdate = eCRepository.findAll().size();
        eC.setId(count.incrementAndGet());

        // Create the EC
        ECDTO eCDTO = eCMapper.toDto(eC);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restECMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(eCDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the EC in the database
        List<EC> eCList = eCRepository.findAll();
        assertThat(eCList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateECWithPatch() throws Exception {
        // Initialize the database
        eCRepository.saveAndFlush(eC);

        int databaseSizeBeforeUpdate = eCRepository.findAll().size();

        // Update the eC using partial update
        EC partialUpdatedEC = new EC();
        partialUpdatedEC.setId(eC.getId());

        partialUpdatedEC.nomEC(UPDATED_NOM_EC).coeff(UPDATED_COEFF);

        restECMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEC.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEC))
            )
            .andExpect(status().isOk());

        // Validate the EC in the database
        List<EC> eCList = eCRepository.findAll();
        assertThat(eCList).hasSize(databaseSizeBeforeUpdate);
        EC testEC = eCList.get(eCList.size() - 1);
        assertThat(testEC.getNomEC()).isEqualTo(UPDATED_NOM_EC);
        assertThat(testEC.getCoeff()).isEqualTo(UPDATED_COEFF);
    }

    @Test
    @Transactional
    void fullUpdateECWithPatch() throws Exception {
        // Initialize the database
        eCRepository.saveAndFlush(eC);

        int databaseSizeBeforeUpdate = eCRepository.findAll().size();

        // Update the eC using partial update
        EC partialUpdatedEC = new EC();
        partialUpdatedEC.setId(eC.getId());

        partialUpdatedEC.nomEC(UPDATED_NOM_EC).coeff(UPDATED_COEFF);

        restECMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEC.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEC))
            )
            .andExpect(status().isOk());

        // Validate the EC in the database
        List<EC> eCList = eCRepository.findAll();
        assertThat(eCList).hasSize(databaseSizeBeforeUpdate);
        EC testEC = eCList.get(eCList.size() - 1);
        assertThat(testEC.getNomEC()).isEqualTo(UPDATED_NOM_EC);
        assertThat(testEC.getCoeff()).isEqualTo(UPDATED_COEFF);
    }

    @Test
    @Transactional
    void patchNonExistingEC() throws Exception {
        int databaseSizeBeforeUpdate = eCRepository.findAll().size();
        eC.setId(count.incrementAndGet());

        // Create the EC
        ECDTO eCDTO = eCMapper.toDto(eC);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restECMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, eCDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(eCDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the EC in the database
        List<EC> eCList = eCRepository.findAll();
        assertThat(eCList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchEC() throws Exception {
        int databaseSizeBeforeUpdate = eCRepository.findAll().size();
        eC.setId(count.incrementAndGet());

        // Create the EC
        ECDTO eCDTO = eCMapper.toDto(eC);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restECMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(eCDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the EC in the database
        List<EC> eCList = eCRepository.findAll();
        assertThat(eCList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamEC() throws Exception {
        int databaseSizeBeforeUpdate = eCRepository.findAll().size();
        eC.setId(count.incrementAndGet());

        // Create the EC
        ECDTO eCDTO = eCMapper.toDto(eC);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restECMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(eCDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the EC in the database
        List<EC> eCList = eCRepository.findAll();
        assertThat(eCList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteEC() throws Exception {
        // Initialize the database
        eCRepository.saveAndFlush(eC);

        int databaseSizeBeforeDelete = eCRepository.findAll().size();

        // Delete the eC
        restECMockMvc.perform(delete(ENTITY_API_URL_ID, eC.getId()).accept(MediaType.APPLICATION_JSON)).andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EC> eCList = eCRepository.findAll();
        assertThat(eCList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
