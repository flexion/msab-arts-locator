import { Container, Content, Columns, Column } from 'bloomer';

export const Footer = () => (
  <Footer id="footer">
    <Container isFluid>
      <Content>
        <Columns>
          <Column isFull>
            <p>Presented by the Minnesota State Arts Board</p>
          </Column>
        </Columns>
      </Content>
    </Container>
  </Footer>
);
