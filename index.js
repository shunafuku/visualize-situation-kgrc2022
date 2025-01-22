class CreateX3D {
  constructor(insertPositionId) {
    this.insertPositionId = insertPositionId;
    this.x3dScene = document
      .getElementById(insertPositionId)
      .querySelector("x3d")
      .querySelector("scene");
  }

  boxInsert(center, size, rgb = [0, 1, 0], transparency = 0.6) {
    const sizeCoordinates = { x: size[0], y: size[1], z: size[2] };
    const centerCoordinates = { x: center[0], y: center[1], z: center[2] };
    this.x3dScene.insertAdjacentHTML(
      "beforeend",
      `<transform translation='` +
        Object.values(centerCoordinates).join(" ") +
        `'>
        <shape>
          <appearance>
            <material diffuseColor='` +
        rgb.join(" ") +
        `' transparency=` +
        transparency +
        `></material>
          </appearance>
          <box size=` +
        Object.values(sizeCoordinates).join(",") +
        `></box>
        </shape>
      </transform>`
    );
  }
}

function exponent2decimal(exponentNotation) {
  const [mantissa, exponent] = exponentNotation.split("e");
  const decimal = mantissa * 10 ** exponent;
  return decimal;
}

function extractXYZ(input) {
  const X = exponent2decimal(input.x.value);
  const Y = exponent2decimal(input.y.value);
  const Z = exponent2decimal(input.z.value);
  return [X, Y, Z];
}

function sendSPARQLQuery(sparqlQuery) {
  const endpointUrl = "http://kgrc4si.ml:7200/repositories/KGRC4SIv01";
  const fullUrl = endpointUrl + "?query=" + encodeURIComponent(query);
  const headers = {
    Accept: "application/sparql-results+json",
  };

  return fetch(fullUrl, { headers }).then((body) => body.json());
}
