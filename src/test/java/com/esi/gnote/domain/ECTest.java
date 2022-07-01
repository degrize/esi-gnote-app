package com.esi.gnote.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.esi.gnote.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ECTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EC.class);
        EC eC1 = new EC();
        eC1.setId(1L);
        EC eC2 = new EC();
        eC2.setId(eC1.getId());
        assertThat(eC1).isEqualTo(eC2);
        eC2.setId(2L);
        assertThat(eC1).isNotEqualTo(eC2);
        eC1.setId(null);
        assertThat(eC1).isNotEqualTo(eC2);
    }
}
