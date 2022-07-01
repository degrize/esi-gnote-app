package com.esi.gnote.service.impl;

import com.esi.gnote.domain.UE;
import com.esi.gnote.repository.UERepository;
import com.esi.gnote.service.UEService;
import com.esi.gnote.service.dto.UEDTO;
import com.esi.gnote.service.mapper.UEMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link UE}.
 */
@Service
@Transactional
public class UEServiceImpl implements UEService {

    private final Logger log = LoggerFactory.getLogger(UEServiceImpl.class);

    private final UERepository uERepository;

    private final UEMapper uEMapper;

    public UEServiceImpl(UERepository uERepository, UEMapper uEMapper) {
        this.uERepository = uERepository;
        this.uEMapper = uEMapper;
    }

    @Override
    public UEDTO save(UEDTO uEDTO) {
        log.debug("Request to save UE : {}", uEDTO);
        UE uE = uEMapper.toEntity(uEDTO);
        uE = uERepository.save(uE);
        return uEMapper.toDto(uE);
    }

    @Override
    public UEDTO update(UEDTO uEDTO) {
        log.debug("Request to save UE : {}", uEDTO);
        UE uE = uEMapper.toEntity(uEDTO);
        uE = uERepository.save(uE);
        return uEMapper.toDto(uE);
    }

    @Override
    public Optional<UEDTO> partialUpdate(UEDTO uEDTO) {
        log.debug("Request to partially update UE : {}", uEDTO);

        return uERepository
            .findById(uEDTO.getId())
            .map(existingUE -> {
                uEMapper.partialUpdate(existingUE, uEDTO);

                return existingUE;
            })
            .map(uERepository::save)
            .map(uEMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<UEDTO> findAll(Pageable pageable) {
        log.debug("Request to get all UES");
        return uERepository.findAll(pageable).map(uEMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<UEDTO> findOne(Long id) {
        log.debug("Request to get UE : {}", id);
        return uERepository.findById(id).map(uEMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete UE : {}", id);
        uERepository.deleteById(id);
    }
}
