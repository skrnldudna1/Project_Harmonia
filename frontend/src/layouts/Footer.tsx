// 📂 layouts/Footer.tsx
import { Box, Container, Typography, Link, Stack } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "223.59px",
        flexShrink: 0,
        bgcolor: "#FFF7F3",
        color: "#333",
        py: 4,
        textAlign: "center",
        borderTop: "1px solid #ddd",
      }}
    >
      <Container>
        {/* 회사 정보 */}
        <Typography variant="body1" fontWeight="bold">
          COMPANY : (주) 하모니아
        </Typography>
        <Typography variant="body2">BUSINESS NUMBER L. 123-45-67890</Typography>
        <Typography variant="body2">
          ONLINE BUSINESS L. 2025-서울-12345 [사업자정보확인]
        </Typography>
        <Typography variant="body2">
          ADD : ***REMOVED*** 서울특별시 강남구 테헤란로 12길 34 A층
        </Typography>
        <Typography variant="body2">TEL : 02 - 1234 - 456</Typography>
        <Typography variant="body2">
          CEO : 수희 / CPO : 수희 (<Link href="smqq7107@naver.com" color="inherit">smqq7107@naver.com</Link>)
        </Typography>

        <Typography variant="body2" mt={1}>
          Contact for more information.
        </Typography>

        {/* 카피라이트 */}
        <Typography variant="body2" mt={2} color="text.secondary">
          © {new Date().getFullYear()} (주) 하모니아 All right reserved
        </Typography>

        {/* 링크 목록 */}
        <Stack direction="row" justifyContent="center" spacing={3} mt={2}>
          <Link href="#" color="inherit" underline="hover">
            CONTACT
          </Link>
          <Link href="#" color="inherit" underline="hover">
            AGREEMENT
          </Link>
          <Link href="#" color="inherit" underline="hover">
            PRIVACY
          </Link>
          <Link href="#" color="inherit" underline="hover">
            GUIDE
          </Link>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;

  