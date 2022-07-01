package com.esi.gnote.repository;

import com.esi.gnote.domain.Etudiant;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Etudiant entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EtudiantRepository extends JpaRepository<Etudiant, Long> {}
