package com.esi.gnote.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.esi.gnote.IntegrationTest;
import com.esi.gnote.domain.UE;
import com.esi.gnote.repository.UERepository;
import com.esi.gnote.service.dto.UEDTO;
import com.esi.gnote.service.mapper.UEMapper;
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
 * Integration tests for the {@link UEResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class UEResourceIT {

    private static final String DEFAULT_NOM_UE = "AAAAAAAAAA";
    private static final String UPDATED_NOM_UE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/ues";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private UERepository uERepository;

    @Autowired
    private UEMapper uEMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restUEMockMvc;

    private UE uE;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UE createEntity(EntityManager em) {
        UE uE = new UE().nomUE(DEFAULT_NOM_UE);
        return uE;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UE createUpdatedEntity(EntityManager em) {
        UE uE = new UE().nomUE(UPDATED_NOM_UE);
        return uE;
    }

    @BeforeEach
    public void initTest() {
        uE = createEntity(em);
    }

    @Test
    @Transactional
    void createUE() throws Exception {
        int databaseSizeBeforeCreate = uERepository.findAll().size();
        // Create the UE
        UEDTO uEDTO = uEMapper.toDto(uE);
        restUEMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(uEDTO)))
            .andExpect(status().isCreated());

        // Validate the UE in the database
        List<UE> uEList = uERepository.findAll();
        assertThat(uEList).hasSize(databaseSizeBeforeCreate + 1);
        UE testUE = uEList.get(uEList.size() - 1);
        assertThat(testUE.getNomUE()).isEqualTo(DEFAULT_NOM_UE);
    }

    @Test
    @Transactional
    void createUEWithExistingId() throws Exception {
        // Create the UE with an existing ID
        uE.setId(1L);
        UEDTO uEDTO = uEMapper.toDto(uE);

        int databaseSizeBeforeCreate = uERepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restUEMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(uEDTO)))
            .andExpect(status().isBadRequest());

        // Validate the UE in the database
        List<UE> uEList = uERepository.findAll();
        assertThat(uEList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllUES() throws Exception {
        // Initialize the database
        uERepository.saveAndFlush(uE);

        // Get all the uEList
        restUEMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(uE.getId().intValue())))
            .andExpect(jsonPath("$.[*].nomUE").value(hasItem(DEFAULT_NOM_UE)));
    }

    @Test
    @Transactional
    void getUE() throws Exception {
        // Initialize the database
        uERepository.saveAndFlush(uE);

        // Get the uE
        restUEMockMvc
            .perform(get(ENTITY_API_URL_ID, uE.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(uE.getId().intValue()))
            .andExpect(jsonPath("$.nomUE").value(DEFAULT_NOM_UE));
    }

    @Test
    @Transactional
    void getNonExistingUE() throws Exception {
        // Get the uE
        restUEMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewUE() throws Exception {
        // Initialize the database
        uERepository.saveAndFlush(uE);

        int databaseSizeBeforeUpdate = uERepository.findAll().size();

        // Update the uE
        UE updatedUE = uERepository.findById(uE.getId()).get();
        // Disconnect from session so that the updates on updatedUE are not directly saved in db
        em.detach(updatedUE);
        updatedUE.nomUE(UPDATED_NOM_UE);
        UEDTO uEDTO = uEMapper.toDto(updatedUE);

        restUEMockMvc
            .perform(
                put(ENTITY_API_URL_ID, uEDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(uEDTO))
            )
            .andExpect(status().isOk());

        // Validate the UE in the database
        List<UE> uEList = uERepository.findAll();
        assertThat(uEList).hasSize(databaseSizeBeforeUpdate);
        UE testUE = uEList.get(uEList.size() - 1);
        assertThat(testUE.getNomUE()).isEqualTo(UPDATED_NOM_UE);
    }

    @Test
    @Transactional
    void putNonExistingUE() throws Exception {
        int databaseSizeBeforeUpdate = uERepository.findAll().size();
        uE.setId(count.incrementAndGet());

        // Create the UE
        UEDTO uEDTO = uEMapper.toDto(uE);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUEMockMvc
            .perform(
                put(ENTITY_API_URL_ID, uEDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(uEDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the UE in the database
        List<UE> uEList = uERepository.findAll();
        assertThat(uEList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchUE() throws Exception {
        int databaseSizeBeforeUpdate = uERepository.findAll().size();
        uE.setId(count.incrementAndGet());

        // Create the UE
        UEDTO uEDTO = uEMapper.toDto(uE);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUEMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(uEDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the UE in the database
        List<UE> uEList = uERepository.findAll();
        assertThat(uEList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamUE() throws Exception {
        int databaseSizeBeforeUpdate = uERepository.findAll().size();
        uE.setId(count.incrementAndGet());

        // Create the UE
        UEDTO uEDTO = uEMapper.toDto(uE);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUEMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(uEDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the UE in the database
        List<UE> uEList = uERepository.findAll();
        assertThat(uEList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateUEWithPatch() throws Exception {
        // Initialize the database
        uERepository.saveAndFlush(uE);

        int databaseSizeBeforeUpdate = uERepository.findAll().size();

        // Update the uE using partial update
        UE partialUpdatedUE = new UE();
        partialUpdatedUE.setId(uE.getId());

        restUEMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedUE.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedUE))
            )
            .andExpect(status().isOk());

        // Validate the UE in the database
        List<UE> uEList = uERepository.findAll();
        assertThat(uEList).hasSize(databaseSizeBeforeUpdate);
        UE testUE = uEList.get(uEList.size() - 1);
        assertThat(testUE.getNomUE()).isEqualTo(DEFAULT_NOM_UE);
    }

    @Test
    @Transactional
    void fullUpdateUEWithPatch() throws Exception {
        // Initialize the database
        uERepository.saveAndFlush(uE);

        int databaseSizeBeforeUpdate = uERepository.findAll().size();

        // Update the uE using partial update
        UE partialUpdatedUE = new UE();
        partialUpdatedUE.setId(uE.getId());

        partialUpdatedUE.nomUE(UPDATED_NOM_UE);

        restUEMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedUE.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedUE))
            )
            .andExpect(status().isOk());

        // Validate the UE in the database
        List<UE> uEList = uERepository.findAll();
        assertThat(uEList).hasSize(databaseSizeBeforeUpdate);
        UE testUE = uEList.get(uEList.size() - 1);
        assertThat(testUE.getNomUE()).isEqualTo(UPDATED_NOM_UE);
    }

    @Test
    @Transactional
    void patchNonExistingUE() throws Exception {
        int databaseSizeBeforeUpdate = uERepository.findAll().size();
        uE.setId(count.incrementAndGet());

        // Create the UE
        UEDTO uEDTO = uEMapper.toDto(uE);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUEMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, uEDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(uEDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the UE in the database
        List<UE> uEList = uERepository.findAll();
        assertThat(uEList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchUE() throws Exception {
        int databaseSizeBeforeUpdate = uERepository.findAll().size();
        uE.setId(count.incrementAndGet());

        // Create the UE
        UEDTO uEDTO = uEMapper.toDto(uE);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUEMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(uEDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the UE in the database
        List<UE> uEList = uERepository.findAll();
        assertThat(uEList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamUE() throws Exception {
        int databaseSizeBeforeUpdate = uERepository.findAll().size();
        uE.setId(count.incrementAndGet());

        // Create the UE
        UEDTO uEDTO = uEMapper.toDto(uE);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUEMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(uEDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the UE in the database
        List<UE> uEList = uERepository.findAll();
        assertThat(uEList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteUE() throws Exception {
        // Initialize the database
        uERepository.saveAndFlush(uE);

        int databaseSizeBeforeDelete = uERepository.findAll().size();

        // Delete the uE
        restUEMockMvc.perform(delete(ENTITY_API_URL_ID, uE.getId()).accept(MediaType.APPLICATION_JSON)).andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<UE> uEList = uERepository.findAll();
        assertThat(uEList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
