package com.esi.gnote.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ECMapperTest {

    private ECMapper eCMapper;

    @BeforeEach
    public void setUp() {
        eCMapper = new ECMapperImpl();
    }
}
