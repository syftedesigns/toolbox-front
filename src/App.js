import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getFiles } from "./store/actions/filesAction";
import { Col, Container, Row, Table } from "react-bootstrap";
import * as _ from "underscore";

function App() {
  const [loading, setLoading] = useState(true);
  const [filesArray, setFilesArray] = useState([]);
  const dispatch = useDispatch();
  const files = useSelector((state) => state.data);

  useEffect(() => {
    if (loading) {
      dispatch(getFiles());
      if (files.files.data !== undefined) {
        if (files.files.data.length >= 5) {
          mergeFiles(files.files.data).then((table) => setFilesArray(table));
          setLoading(false);
        }
      }
    }
    setTimeout(() => console.log(filesArray), 500);
  }, [files, loading]);

  /*
  Buscamos armar una sola tabla, por ende creamos una funcion que se encarga
  de iterar todos la data que devuelve los files csv como arreglo y elimina los duplicate key
  [file, name, number, hex], y arma un solo arreglo con toda la data csv unificada,
  el unico inconveniente es que la interaccion de los arreglos esta tomando mucho tiempo,
  pero con fines de prueba y no seguir acompleando el codigo, dejaremos esta solucion.
*/

  const mergeFiles = async (iterableFiles) => {
    return new Promise((resolve) => {
      let arrayMerged = new Array();
      let t;
      iterableFiles.forEach((parentFile) =>
        parentFile.forEach((child) => arrayMerged.push(_.uniq(child, false)))
      );
      arrayMerged = arrayMerged.filter(((t = {}), (a) => !(t[a] = a in t)));
      resolve(arrayMerged);
    });
  };

  return (
    <Container fluid className="container">
      <Row>
        <Col className="text-center">
          {!loading && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>{filesArray[0][0]}</th>
                  <th>{filesArray[0][1]}</th>
                  <th>{filesArray[0][2]}</th>
                  <th>{filesArray[0][3]}</th>
                </tr>
              </thead>
              <tbody>
                {filesArray.map(
                  (tr, i) =>
                    i >= 1 && (
                      <tr key={new Date().getTime().toString() + i}>
                        {tr.map((td) => (
                          <td key={new Date().getTime().toString()}>{td}</td>
                        ))}
                      </tr>
                    )
                )}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
