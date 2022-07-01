package com.esi.gnote.service.mapper;

import com.esi.gnote.domain.Professeur;
import com.esi.gnote.service.dto.ProfesseurDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Professeur} and its DTO {@link ProfesseurDTO}.
 */
@Mapper(componentModel = "spring")
public interface ProfesseurMapper extends EntityMapper<ProfesseurDTO, Professeur> {}
