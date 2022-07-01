package com.esi.gnote.repository;

import com.esi.gnote.domain.Soutenance;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Soutenance entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SoutenanceRepository extends JpaRepository<Soutenance, Long> {}
