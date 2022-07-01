package com.esi.gnote.repository;

import com.esi.gnote.domain.Semestre;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Semestre entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SemestreRepository extends JpaRepository<Semestre, Long> {}
