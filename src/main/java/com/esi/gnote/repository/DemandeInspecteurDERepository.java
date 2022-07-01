package com.esi.gnote.repository;

import com.esi.gnote.domain.DemandeInspecteurDE;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the DemandeInspecteurDE entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DemandeInspecteurDERepository extends JpaRepository<DemandeInspecteurDE, Long> {}
