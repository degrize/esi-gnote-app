package com.esi.gnote.service.impl;

import com.esi.gnote.domain.EC;
import com.esi.gnote.repository.ECRepository;
import com.esi.gnote.service.ECService;
import com.esi.gnote.service.dto.ECDTO;
import com.esi.gnote.service.mapper.ECMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link EC}.
 */
@Service
@Transactional
public class ECServiceImpl implements ECService {

    private final Logger log = LoggerFactory.getLogger(ECServiceImpl.class);

    private final ECRepository eCRepository;

    private final ECMapper eCMapper;

    public ECServiceImpl(ECRepository eCRepository, ECMapper eCMapper) {
        this.eCRepository = eCRepository;
        this.eCMapper = eCMapper;
    }

    @Override
    public ECDTO save(ECDTO eCDTO) {
        log.debug("Request to save EC : {}", eCDTO);
        EC eC = eCMapper.toEntity(eCDTO);
        eC = eCRepository.save(eC);
        return eCMapper.toDto(eC);
    }

    @Override
    public ECDTO update(ECDTO eCDTO) {
        log.debug("Request to save EC : {}", eCDTO);
        EC eC = eCMapper.toEntity(eCDTO);
        eC = eCRepository.save(eC);
        return eCMapper.toDto(eC);
    }

    @Override
    public Optional<ECDTO> partialUpdate(ECDTO eCDTO) {
        log.debug("Request to partially update EC : {}", eCDTO);

        return eCRepository
            .findById(eCDTO.getId())
            .map(existingEC -> {
                eCMapper.partialUpdate(existingEC, eCDTO);

                return existingEC;
            })
            .map(eCRepository::save)
            .map(eCMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ECDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ECS");
        return eCRepository.findAll(pageable).map(eCMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ECDTO> findOne(Long id) {
        log.debug("Request to get EC : {}", id);
        return eCRepository.findById(id).map(eCMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete EC : {}", id);
        eCRepository.deleteById(id);
    }
}
