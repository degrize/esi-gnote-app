package com.esi.gnote.repository;

import com.esi.gnote.domain.Planche;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Planche entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlancheRepository extends JpaRepository<Planche, Long> {}
