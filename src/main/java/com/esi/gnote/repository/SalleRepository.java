package com.esi.gnote.repository;

import com.esi.gnote.domain.Salle;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Salle entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SalleRepository extends JpaRepository<Salle, Long> {}
