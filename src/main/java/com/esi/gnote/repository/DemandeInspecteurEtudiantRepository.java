package com.esi.gnote.repository;

import com.esi.gnote.domain.DemandeInspecteurEtudiant;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the DemandeInspecteurEtudiant entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DemandeInspecteurEtudiantRepository extends JpaRepository<DemandeInspecteurEtudiant, Long> {}
