
import Hader from "./hader/hader";
import MainControle from "./d-controle/main-controle";
import ConteinerGrafico from "./conteiner-graficos/main-conteiner-graficos";
import ConteinerSensor from "./conteiner-sersores/main-conteiner-sensores";
import mqtt from "mqtt";
import { useRef, useState, useEffect } from "react";
export default function App() {
    const clientRef = useRef(null);

    const initSite = "site/init";
    // Topicos MQTT
    const varSensorNivelCaixa1 = "caixa/sensor/nivel/1";
    const varSensorNivelCaixa2 = "caixa/sensor/nivel/2";
    const varSensorNivelCaixa3 = "caixa/sensor/nivel/3";

    const varstatusCaixa = "caixa/status";
    const varComandoCaixa = "caixa/controle";

    const varComandoMotor = "motor/controle";
    const varstatusMotor = "motor/status";

    const [logs, setLogs] = useState([]);

    const [sensorNivelCaixa1, setSensorNivelCaixa1] = useState("0");
    const [sensorNivelCaixa2, setSensorNivelCaixa2] = useState("0");
    const [sensorNivelCaixa3, setSensorNivelCaixa3] = useState("0");
    const [comandoCaixa, setComandoCaixa] = useState("0");

    const [statusCaixa, setStatusCaixa] = useState("0");

    const [comandoMotor, setComandoMotor] = useState("0");
    const [statusMotor, setStatusMotor] = useState("0");

    const mqttData = {
        clientRef,
        logs,
        sensorNivelCaixa1,
        sensorNivelCaixa2,
        sensorNivelCaixa3,
        comandoCaixa,
        statusCaixa,
        comandoMotor,
        statusMotor,
        ligarMotor
    };

    const url = "ws://192.168.100.46:9001";

    const options = {
        clean: true,
        connectTimeout: 4000,
        clientId: "client_" + Math.random().toString(16).slice(2, 8),
        username: "admin",
        password: "123",
    };

    useEffect(() => {
        const client = mqtt.connect(url, options);
        clientRef.current = client;

        client.on("connect", () => {
            console.log("Conectado ao MQTT");

            client.subscribe(varSensorNivelCaixa1);
            client.subscribe(varSensorNivelCaixa2);
            client.subscribe(varSensorNivelCaixa3);
            client.subscribe(varstatusCaixa);
            client.subscribe(varComandoCaixa);

            client.subscribe(varComandoMotor);
            client.subscribe(varstatusMotor);

            client.publish(initSite, "true")
        });

        client.on("message", (topic, message) => {
            const data = new Date().toISOString();
            setLogs((prev) => [
                ...prev,
                `${topic}: ${message.toString()} (${data})`,
            ]);
            console.log(`${topic}: ${message.toString()} (${data})`)
        });

        client.on("message", (topic, message) => {
            if (topic == varSensorNivelCaixa1)
                setSensorNivelCaixa1(message.toString());

            if (topic == varSensorNivelCaixa2)
                setSensorNivelCaixa2(message.toString());

            if (topic == varSensorNivelCaixa3)
                setSensorNivelCaixa3(message.toString());

            if (topic == varstatusCaixa) {
                setStatusCaixa(message.toString())
            }
            if (topic == varstatusCaixa) {
                setStatusCaixa(message.toString())
            }
            if (topic == varComandoCaixa) {
                setComandoCaixa(message.toString())
            }
            if (topic == varstatusMotor) {
                setStatusMotor(message.toString())
            }

        });

        return () => {
            client.end();
        };
    }, []);

    function ligarMotor() {
        console.log("Clicado");

        if (statusMotor == "1") {
            clientRef.current.publish(varComandoMotor, "0");
        } else {
            clientRef.current.publish(varComandoMotor, "1");
        }

    }

    return (
        <main> <Hader />
            <div className="dashibord">
                <div className="d-controle">
                    <MainControle mqttData={mqttData} />
                </div>
                <div className="graficos-sensores">
                    <ConteinerSensor />
                </div>
                <div className="graficos-caixas">
                    <ConteinerGrafico mqttData={mqttData} />
                </div>
            </div>
        </main>
    );
}
