import React, { useEffect } from 'react';
import JSONPretty from 'react-json-prettify';
import { useSelector} from 'react-redux';

const VisualizadorJson = () => {
  const responseApiValue = useSelector((state) => state.respuestaApiSlice);
 
  useEffect(() => {
    //console.log("visualizador: ", responseApiValue);
  }, [responseApiValue]);

  return <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
    <JSONPretty json={responseApiValue} />
  </div>;
};

export default VisualizadorJson;
