package com.esi.gnote.repository;

import com.esi.gnote.domain.EC;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the EC entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ECRepository extends JpaRepository<EC, Long> {}
