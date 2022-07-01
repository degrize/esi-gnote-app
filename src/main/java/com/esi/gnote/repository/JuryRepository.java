package com.esi.gnote.repository;

import com.esi.gnote.domain.Jury;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Jury entity.
 */
@SuppressWarnings("unused")
@Repository
public interface JuryRepository extends JpaRepository<Jury, Long> {}
