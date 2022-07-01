package com.esi.gnote.service;

import com.esi.gnote.service.dto.ECDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.esi.gnote.domain.EC}.
 */
public interface ECService {
    /**
     * Save a eC.
     *
     * @param eCDTO the entity to save.
     * @return the persisted entity.
     */
    ECDTO save(ECDTO eCDTO);

    /**
     * Updates a eC.
     *
     * @param eCDTO the entity to update.
     * @return the persisted entity.
     */
    ECDTO update(ECDTO eCDTO);

    /**
     * Partially updates a eC.
     *
     * @param eCDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ECDTO> partialUpdate(ECDTO eCDTO);

    /**
     * Get all the eCS.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ECDTO> findAll(Pageable pageable);

    /**
     * Get the "id" eC.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ECDTO> findOne(Long id);

    /**
     * Delete the "id" eC.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
