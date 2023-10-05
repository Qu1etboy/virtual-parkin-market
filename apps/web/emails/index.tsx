import * as React from "react";
import { Html } from "@react-email/html";
import { Head } from "@react-email/head";
import { Preview } from "@react-email/preview";
import { Container } from "@react-email/container";
import { Section } from "@react-email/section";
import { Button } from "@react-email/button";
import { Text } from "@react-email/text";
import { Img } from "@react-email/img";
import { Hr } from "@react-email/hr";
import { Heading } from "@react-email/heading";

interface WelcomeEmailProps {
  userFirstname: string;
}

export const WelcomeEmail = ({ userFirstname = "Zeno" }: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>
      The sales intelligence platform that helps you uncover qualified leads.
    </Preview>
    <Section style={main}>
      <Container style={container}>
        <Heading as="h1" style={{ textAlign: "center" }}>
          Virtual Park In Market
        </Heading>
        <Text style={paragraph}>สวัสดี {userFirstname},</Text>
        <Text style={paragraph}>
          ยินดีต้อนรับสู่ตลาดนัดพาร์คอินออนไลน์
          ตลาดสุดชิคใจกลางบางแสนในบรรยากาศสวนสวย สะอาด ปลอดภัย
          พร้อมบริการที่ดีที่สุด เตรียมพบกับร้านค้าและสินค้าคุณภาพมากมาย
          ในรูปแบบออนไลน์
        </Text>
        <Section style={btnContainer}>
          <Button pX={12} pY={12} style={button} href="#">
            เลือกชมสินค้า
          </Button>
        </Section>
        <Text style={paragraph}>
          ด้วยความเคารพ,
          <br />
          ตลาดนัดพาร์คอิน
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          20 ถ.บางแสนสาย4เหนือ ต.แสนสุข อ.เมืองชลบุรี จ.ชลบุรี
        </Text>
      </Container>
    </Section>
  </Html>
);

export default WelcomeEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#ff6f61",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
