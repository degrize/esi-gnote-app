package com.esi.gnote.repository;

import com.esi.gnote.domain.UE;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the UE entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UERepository extends JpaRepository<UE, Long> {}
