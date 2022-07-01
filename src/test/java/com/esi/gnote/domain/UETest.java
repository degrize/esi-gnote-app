package com.esi.gnote.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.esi.gnote.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class UETest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UE.class);
        UE uE1 = new UE();
        uE1.setId(1L);
        UE uE2 = new UE();
        uE2.setId(uE1.getId());
        assertThat(uE1).isEqualTo(uE2);
        uE2.setId(2L);
        assertThat(uE1).isNotEqualTo(uE2);
        uE1.setId(null);
        assertThat(uE1).isNotEqualTo(uE2);
    }
}
