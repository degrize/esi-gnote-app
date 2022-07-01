package com.esi.gnote.service.mapper;

import com.esi.gnote.domain.Classe;
import com.esi.gnote.service.dto.ClasseDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Classe} and its DTO {@link ClasseDTO}.
 */
@Mapper(componentModel = "spring")
public interface ClasseMapper extends EntityMapper<ClasseDTO, Classe> {}
