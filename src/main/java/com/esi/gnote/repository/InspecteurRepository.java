package com.esi.gnote.repository;

import com.esi.gnote.domain.Inspecteur;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Inspecteur entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InspecteurRepository extends JpaRepository<Inspecteur, Long> {}
