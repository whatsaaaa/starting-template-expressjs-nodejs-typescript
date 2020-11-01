import { useContainer as classValidatorUseContainer } from "class-validator";
import { useContainer as routingUseContainer } from "routing-controllers";
import { Container } from "typedi";

export const typediBuilder = () => {
  routingUseContainer(Container);
  classValidatorUseContainer(Container);
};
