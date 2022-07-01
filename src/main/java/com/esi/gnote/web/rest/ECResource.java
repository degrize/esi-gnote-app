package com.esi.gnote.web.rest;

import com.esi.gnote.repository.ECRepository;
import com.esi.gnote.service.ECService;
import com.esi.gnote.service.dto.ECDTO;
import com.esi.gnote.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.esi.gnote.domain.EC}.
 */
@RestController
@RequestMapping("/api")
public class ECResource {

    private final Logger log = LoggerFactory.getLogger(ECResource.class);

    private static final String ENTITY_NAME = "eC";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ECService eCService;

    private final ECRepository eCRepository;

    public ECResource(ECService eCService, ECRepository eCRepository) {
        this.eCService = eCService;
        this.eCRepository = eCRepository;
    }

    /**
     * {@code POST  /ecs} : Create a new eC.
     *
     * @param eCDTO the eCDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new eCDTO, or with status {@code 400 (Bad Request)} if the eC has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ecs")
    public ResponseEntity<ECDTO> createEC(@Valid @RequestBody ECDTO eCDTO) throws URISyntaxException {
        log.debug("REST request to save EC : {}", eCDTO);
        if (eCDTO.getId() != null) {
            throw new BadRequestAlertException("A new eC cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ECDTO result = eCService.save(eCDTO);
        return ResponseEntity
            .created(new URI("/api/ecs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ecs/:id} : Updates an existing eC.
     *
     * @param id the id of the eCDTO to save.
     * @param eCDTO the eCDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated eCDTO,
     * or with status {@code 400 (Bad Request)} if the eCDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the eCDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ecs/{id}")
    public ResponseEntity<ECDTO> updateEC(@PathVariable(value = "id", required = false) final Long id, @Valid @RequestBody ECDTO eCDTO)
        throws URISyntaxException {
        log.debug("REST request to update EC : {}, {}", id, eCDTO);
        if (eCDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, eCDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!eCRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ECDTO result = eCService.update(eCDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, eCDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /ecs/:id} : Partial updates given fields of an existing eC, field will ignore if it is null
     *
     * @param id the id of the eCDTO to save.
     * @param eCDTO the eCDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated eCDTO,
     * or with status {@code 400 (Bad Request)} if the eCDTO is not valid,
     * or with status {@code 404 (Not Found)} if the eCDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the eCDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/ecs/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ECDTO> partialUpdateEC(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody ECDTO eCDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update EC partially : {}, {}", id, eCDTO);
        if (eCDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, eCDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!eCRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ECDTO> result = eCService.partialUpdate(eCDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, eCDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /ecs} : get all the eCS.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of eCS in body.
     */
    @GetMapping("/ecs")
    public ResponseEntity<List<ECDTO>> getAllECS(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of ECS");
        Page<ECDTO> page = eCService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /ecs/:id} : get the "id" eC.
     *
     * @param id the id of the eCDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the eCDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ecs/{id}")
    public ResponseEntity<ECDTO> getEC(@PathVariable Long id) {
        log.debug("REST request to get EC : {}", id);
        Optional<ECDTO> eCDTO = eCService.findOne(id);
        return ResponseUtil.wrapOrNotFound(eCDTO);
    }

    /**
     * {@code DELETE  /ecs/:id} : delete the "id" eC.
     *
     * @param id the id of the eCDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ecs/{id}")
    public ResponseEntity<Void> deleteEC(@PathVariable Long id) {
        log.debug("REST request to delete EC : {}", id);
        eCService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
