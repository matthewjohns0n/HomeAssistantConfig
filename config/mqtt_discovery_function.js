var config = msg.payload;
var mqtt = [];

for (var i in config.tires) {
    tire = config.tires[i];

  for (var j in config.entities) {
    entity = config.entities[j];


    var newMqtt = {}
    newMqtt.platform = "mqtt";
    newMqtt.friendly_name = "Tire " + tire.location + ' - ' + entity.name;

    var name = "tire_" + tire.location + '_' + entity.name;
    name = name.replace(/ /g,"_").toLowerCase();
    newMqtt.name = name;
    newMqtt.state_topic = "rtl_433/9b13b3f4-rtl433/devices/TPMS/Schrader/" + tire.id + "/" + entity.topic_segment
    newMqtt.value_template = entity.value_template;

    /* optional properties: */
    if(entity.hasOwnProperty('unit_of_measurement')) {
        newMqtt.unit_of_measurement = entity.unit_of_measurement;
    }
    if(entity.hasOwnProperty('device_class')) {
        newMqtt.device_class = entity.device_class;
    }
    if(entity.hasOwnProperty('state_class')) {
        newMqtt.state_class = entity.state_class;
    }
    if(entity.hasOwnProperty('icon')) {
        newMqtt.icon = entity.icon;
    }

    newMqtt.unique_id = "TPMS-Schrader-" + tire.id + "-" + entity.identifier;

    var device = {};
    device.identifiers = 'TPMS-Schrader-' + tire.id;
    device.name = 'TPMS-Schrader-' + tire.id;
    device.model = 'Schrader';
    device.manufacturer = 'rtl_433';

    newMqtt.device = device;
    mqtt.push(newMqtt);
  }
}

msg.payload = mqtt;
// var json = JSON.stringify(mqtt);

