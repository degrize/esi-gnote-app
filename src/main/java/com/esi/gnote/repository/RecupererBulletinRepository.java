package com.esi.gnote.repository;

import com.esi.gnote.domain.RecupererBulletin;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the RecupererBulletin entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RecupererBulletinRepository extends JpaRepository<RecupererBulletin, Long> {}
