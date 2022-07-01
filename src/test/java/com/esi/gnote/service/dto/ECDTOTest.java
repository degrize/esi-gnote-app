package com.esi.gnote.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.esi.gnote.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ECDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ECDTO.class);
        ECDTO eCDTO1 = new ECDTO();
        eCDTO1.setId(1L);
        ECDTO eCDTO2 = new ECDTO();
        assertThat(eCDTO1).isNotEqualTo(eCDTO2);
        eCDTO2.setId(eCDTO1.getId());
        assertThat(eCDTO1).isEqualTo(eCDTO2);
        eCDTO2.setId(2L);
        assertThat(eCDTO1).isNotEqualTo(eCDTO2);
        eCDTO1.setId(null);
        assertThat(eCDTO1).isNotEqualTo(eCDTO2);
    }
}
