package com.esi.gnote.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.esi.gnote.IntegrationTest;
import com.esi.gnote.domain.Filiere;
import com.esi.gnote.repository.FiliereRepository;
import com.esi.gnote.service.dto.FiliereDTO;
import com.esi.gnote.service.mapper.FiliereMapper;
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
 * Integration tests for the {@link FiliereResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class FiliereResourceIT {

    private static final String DEFAULT_NOM_FILIERE = "AAAAAAAAAA";
    private static final String UPDATED_NOM_FILIERE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/filieres";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private FiliereRepository filiereRepository;

    @Autowired
    private FiliereMapper filiereMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restFiliereMockMvc;

    private Filiere filiere;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Filiere createEntity(EntityManager em) {
        Filiere filiere = new Filiere().nomFiliere(DEFAULT_NOM_FILIERE);
        return filiere;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Filiere createUpdatedEntity(EntityManager em) {
        Filiere filiere = new Filiere().nomFiliere(UPDATED_NOM_FILIERE);
        return filiere;
    }

    @BeforeEach
    public void initTest() {
        filiere = createEntity(em);
    }

    @Test
    @Transactional
    void createFiliere() throws Exception {
        int databaseSizeBeforeCreate = filiereRepository.findAll().size();
        // Create the Filiere
        FiliereDTO filiereDTO = filiereMapper.toDto(filiere);
        restFiliereMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(filiereDTO)))
            .andExpect(status().isCreated());

        // Validate the Filiere in the database
        List<Filiere> filiereList = filiereRepository.findAll();
        assertThat(filiereList).hasSize(databaseSizeBeforeCreate + 1);
        Filiere testFiliere = filiereList.get(filiereList.size() - 1);
        assertThat(testFiliere.getNomFiliere()).isEqualTo(DEFAULT_NOM_FILIERE);
    }

    @Test
    @Transactional
    void createFiliereWithExistingId() throws Exception {
        // Create the Filiere with an existing ID
        filiere.setId(1L);
        FiliereDTO filiereDTO = filiereMapper.toDto(filiere);

        int databaseSizeBeforeCreate = filiereRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restFiliereMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(filiereDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Filiere in the database
        List<Filiere> filiereList = filiereRepository.findAll();
        assertThat(filiereList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNomFiliereIsRequired() throws Exception {
        int databaseSizeBeforeTest = filiereRepository.findAll().size();
        // set the field null
        filiere.setNomFiliere(null);

        // Create the Filiere, which fails.
        FiliereDTO filiereDTO = filiereMapper.toDto(filiere);

        restFiliereMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(filiereDTO)))
            .andExpect(status().isBadRequest());

        List<Filiere> filiereList = filiereRepository.findAll();
        assertThat(filiereList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllFilieres() throws Exception {
        // Initialize the database
        filiereRepository.saveAndFlush(filiere);

        // Get all the filiereList
        restFiliereMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(filiere.getId().intValue())))
            .andExpect(jsonPath("$.[*].nomFiliere").value(hasItem(DEFAULT_NOM_FILIERE)));
    }

    @Test
    @Transactional
    void getFiliere() throws Exception {
        // Initialize the database
        filiereRepository.saveAndFlush(filiere);

        // Get the filiere
        restFiliereMockMvc
            .perform(get(ENTITY_API_URL_ID, filiere.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(filiere.getId().intValue()))
            .andExpect(jsonPath("$.nomFiliere").value(DEFAULT_NOM_FILIERE));
    }

    @Test
    @Transactional
    void getNonExistingFiliere() throws Exception {
        // Get the filiere
        restFiliereMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewFiliere() throws Exception {
        // Initialize the database
        filiereRepository.saveAndFlush(filiere);

        int databaseSizeBeforeUpdate = filiereRepository.findAll().size();

        // Update the filiere
        Filiere updatedFiliere = filiereRepository.findById(filiere.getId()).get();
        // Disconnect from session so that the updates on updatedFiliere are not directly saved in db
        em.detach(updatedFiliere);
        updatedFiliere.nomFiliere(UPDATED_NOM_FILIERE);
        FiliereDTO filiereDTO = filiereMapper.toDto(updatedFiliere);

        restFiliereMockMvc
            .perform(
                put(ENTITY_API_URL_ID, filiereDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(filiereDTO))
            )
            .andExpect(status().isOk());

        // Validate the Filiere in the database
        List<Filiere> filiereList = filiereRepository.findAll();
        assertThat(filiereList).hasSize(databaseSizeBeforeUpdate);
        Filiere testFiliere = filiereList.get(filiereList.size() - 1);
        assertThat(testFiliere.getNomFiliere()).isEqualTo(UPDATED_NOM_FILIERE);
    }

    @Test
    @Transactional
    void putNonExistingFiliere() throws Exception {
        int databaseSizeBeforeUpdate = filiereRepository.findAll().size();
        filiere.setId(count.incrementAndGet());

        // Create the Filiere
        FiliereDTO filiereDTO = filiereMapper.toDto(filiere);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFiliereMockMvc
            .perform(
                put(ENTITY_API_URL_ID, filiereDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(filiereDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Filiere in the database
        List<Filiere> filiereList = filiereRepository.findAll();
        assertThat(filiereList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchFiliere() throws Exception {
        int databaseSizeBeforeUpdate = filiereRepository.findAll().size();
        filiere.setId(count.incrementAndGet());

        // Create the Filiere
        FiliereDTO filiereDTO = filiereMapper.toDto(filiere);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFiliereMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(filiereDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Filiere in the database
        List<Filiere> filiereList = filiereRepository.findAll();
        assertThat(filiereList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamFiliere() throws Exception {
        int databaseSizeBeforeUpdate = filiereRepository.findAll().size();
        filiere.setId(count.incrementAndGet());

        // Create the Filiere
        FiliereDTO filiereDTO = filiereMapper.toDto(filiere);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFiliereMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(filiereDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Filiere in the database
        List<Filiere> filiereList = filiereRepository.findAll();
        assertThat(filiereList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateFiliereWithPatch() throws Exception {
        // Initialize the database
        filiereRepository.saveAndFlush(filiere);

        int databaseSizeBeforeUpdate = filiereRepository.findAll().size();

        // Update the filiere using partial update
        Filiere partialUpdatedFiliere = new Filiere();
        partialUpdatedFiliere.setId(filiere.getId());

        partialUpdatedFiliere.nomFiliere(UPDATED_NOM_FILIERE);

        restFiliereMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedFiliere.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedFiliere))
            )
            .andExpect(status().isOk());

        // Validate the Filiere in the database
        List<Filiere> filiereList = filiereRepository.findAll();
        assertThat(filiereList).hasSize(databaseSizeBeforeUpdate);
        Filiere testFiliere = filiereList.get(filiereList.size() - 1);
        assertThat(testFiliere.getNomFiliere()).isEqualTo(UPDATED_NOM_FILIERE);
    }

    @Test
    @Transactional
    void fullUpdateFiliereWithPatch() throws Exception {
        // Initialize the database
        filiereRepository.saveAndFlush(filiere);

        int databaseSizeBeforeUpdate = filiereRepository.findAll().size();

        // Update the filiere using partial update
        Filiere partialUpdatedFiliere = new Filiere();
        partialUpdatedFiliere.setId(filiere.getId());

        partialUpdatedFiliere.nomFiliere(UPDATED_NOM_FILIERE);

        restFiliereMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedFiliere.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedFiliere))
            )
            .andExpect(status().isOk());

        // Validate the Filiere in the database
        List<Filiere> filiereList = filiereRepository.findAll();
        assertThat(filiereList).hasSize(databaseSizeBeforeUpdate);
        Filiere testFiliere = filiereList.get(filiereList.size() - 1);
        assertThat(testFiliere.getNomFiliere()).isEqualTo(UPDATED_NOM_FILIERE);
    }

    @Test
    @Transactional
    void patchNonExistingFiliere() throws Exception {
        int databaseSizeBeforeUpdate = filiereRepository.findAll().size();
        filiere.setId(count.incrementAndGet());

        // Create the Filiere
        FiliereDTO filiereDTO = filiereMapper.toDto(filiere);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFiliereMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, filiereDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(filiereDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Filiere in the database
        List<Filiere> filiereList = filiereRepository.findAll();
        assertThat(filiereList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchFiliere() throws Exception {
        int databaseSizeBeforeUpdate = filiereRepository.findAll().size();
        filiere.setId(count.incrementAndGet());

        // Create the Filiere
        FiliereDTO filiereDTO = filiereMapper.toDto(filiere);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFiliereMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(filiereDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Filiere in the database
        List<Filiere> filiereList = filiereRepository.findAll();
        assertThat(filiereList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamFiliere() throws Exception {
        int databaseSizeBeforeUpdate = filiereRepository.findAll().size();
        filiere.setId(count.incrementAndGet());

        // Create the Filiere
        FiliereDTO filiereDTO = filiereMapper.toDto(filiere);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFiliereMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(filiereDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Filiere in the database
        List<Filiere> filiereList = filiereRepository.findAll();
        assertThat(filiereList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteFiliere() throws Exception {
        // Initialize the database
        filiereRepository.saveAndFlush(filiere);

        int databaseSizeBeforeDelete = filiereRepository.findAll().size();

        // Delete the filiere
        restFiliereMockMvc
            .perform(delete(ENTITY_API_URL_ID, filiere.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Filiere> filiereList = filiereRepository.findAll();
        assertThat(filiereList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
