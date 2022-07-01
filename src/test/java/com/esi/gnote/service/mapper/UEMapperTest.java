package com.esi.gnote.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class UEMapperTest {

    private UEMapper uEMapper;

    @BeforeEach
    public void setUp() {
        uEMapper = new UEMapperImpl();
    }
}
