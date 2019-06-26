import React from 'react';
import spinner from '../images/logo1.gif';
import { Modal, ModalBackground, ModalContent } from 'bloomer';

export const Loading = (findingResults, askingLocation, haveGeo) => (
  <div className="msab-has-background-purple">
    <Modal>
      <ModalBackground />
      <ModalContent>
        <img src={spinner} />
        {askingLocation && <div>Finding your location</div>}
      </ModalContent>
    </Modal>
  </div>
);
