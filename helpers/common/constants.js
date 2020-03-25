/*
* COPYRIGHT (C) 2019 Molex - All Rights Reserved 
*/
// Declare application constants

//floor plan path
const FLOOR_PLAN_PATH = "public/img/";

//UNKNOWN Constants
const UNKNOWN_Normal = 'Unknown';
const UNKNOWN_UPEERCASE = 'UNKNOWN';
const UNKNOWN_lowercase = 'unknown';

//light state 
const LIGHT_STATE_OFF_lowercase = 'off';
const LIGHT_STATE_ON_lowercase = 'on';
//sensor SenML timeseries object: predicted size in Mb ,considered 22 bytes of one object
const SENML_OBJECT_SIZE = 0.0000209808349609375;
//sensor role
const HUMIDITY = 'HUM';
const TEMPERATURE = 'TEMP';
const LUX = 'AL';
const COLOR_TEMPERATURE = 'CT';
const PRESENCE = 'PIR';
const AIR_QUALITY = 'AQ';
const POWER = 'PW';
const SWITCH = 'SW'

//Calucaltions Unit
const NOTAVAILABLE = 'N/A';
const KW = 'kW';
const WATT = 'W';
const POUND = 'pound';
const KWH = 'kWh';
const PERCENTAGE = '%';
const MINUTE = "m";
const HOUR = "h";

//heat index (shade values)condition 
const CAUTION = 'caution';
const EXTREME_CAUTION = 'extreme caution';
const DANGER = 'danger';
const EXTREME_DANGER = 'extreme danger';


//USER Constants
const USER_Normal = 'User';
const USER_UPEERCASE = 'USER';
const USER_lowercase = 'user';

//GENERAL Constants
const GENERAL_Normal = 'General';
const GENERAL_UPEERCASE = 'GENERAL';
const GENERAL_lowercase = 'general';

//Mode Constants
const legacy = 'Legacy';
const nextgen = 'NextGen';

//INFORMATION Constants
const INFORMATION_Normal = 'Information';
const INFORMATION_UPEERCASE = 'INFORMATION';
const INFORMATION_lowercase = 'information';

//BUILDING Constants
const BUILDING_Normal = 'Building';
const BUILDING_UPEERCASE = 'BUILDING';
const BUILDING_lowercase = 'building';


// SHADES Constants
const SHADES_Normal = 'Shades';
const SHADES_UPEERCASE = 'SHADES';
const SHADES_lowercase = 'shades';

// SHADING Constants
const SHADING_Normal = 'Shading';
const SHADING_UPEERCASE = 'SHADING';
const SHADING_lowercase = 'shading';

// BEACON Constants
const BEACON_Normal = 'Beacon';
const BEACON_UPEERCASE = 'BEACON';
const BEACON_lowercase = 'beacon';


// BRIGTHNESS Constants
const BRIGTHNESS_Normal = 'Brightness';
const BRIGTHNESS_UPEERCASE = 'BRIGTHNESS';
const BRIGTHNESS_lowercase = 'brightness';

// IMMERSION Constants
const IMMERSION_Normal = 'Immersion';
const IMMERSION_UPEERCASE = 'IMMERSION';
const IMMERSION_lowercase = 'immersion';

// SATURATION Constants
const SATURATION_Normal = 'Saturation';
const SATURATION_UPEERCASE = 'SATURATION';
const SATURATION_lowercase = 'saturation';

// BIOADAPTIVE Constants
const BIOADAPTIVE_Normal = 'Bioadaptive';
const BIOADAPTIVE_UPEERCASE = 'BIOADAPTIVE';
const BIOADAPTIVE_lowercase = 'bioadaptive';

// BIODYNAMIC Constants
const BIODYNAMIC_Normal = 'Biodynamic';
const BIODYNAMIC_UPEERCASE = 'BIODYNAMIC';
const BIODYNAMIC_lowercase = 'biodynamic';

// ALL Constants
const ALL_Normal = 'All';
const ALL_UPPERCASE = 'ALL';
const ALL_lowercase = 'all';

// FLOOR Constants
const FLOOR_Normal = 'Floor';
const FLOOR_UPPERCASE = 'FLOOR';
const FLOOR_lowercase = 'floor';

// ZONE Constants
const ZONE_Normal = 'Zone';
const ZONE_UPPERCASE = 'ZONE';
const ZONE_lowercase = 'zone';

// DEVICE Constants
const DEVICE_Normal = 'Device';
const DEVICE_UPPERCASE = 'DEVICE';
const DEVICE_lowercase = 'device';

// BLIND Constants
const BLIND_Normal = 'Blind';
const BLIND_UPPERCASE = 'BLIND';
const BLIND_lowercase = 'blind';


// FIXTURE Constants
const FIXTURE_Normal = 'Fixture';
const FIXTURE_UPPERCASE = 'FIXTURE';
const FIXTURE_lowercase = 'fixture';

// SENSOR Constants
const SENSOR_Normal = 'Sensor';
const SENSOR_UPPERCASE = 'SENSOR';
const SENSOR_lowercase = 'sensor';

//notification Types
const NOTIFICATION_SENSOR_ENABLED = 'sensorEnabled';
const NOTIFICATION_SENSOR_DISABLED = 'sensorDisabled';

//Audit Logs SIZE LIMIT
const SIZE_LIMIT = 4096 * 1024 * 1024;
const AUDIT_KEY = "auditLogs";

//CO2 Emission value
const CO2_EMISSION = 0.547096737;

//Watt to kilowat devision factor
const KW_DIV_FACTOR = 1000;

//Default power usage of light
const FIXTURE_PW_USAGE = 60;

//MINUTE CONSUME FACTOR for power calculation
const A_MINUTE_CONSUME_FACTOR = 0.0166666666666667;

//Kg to pound converter factor
const KGTOPOUND_FACTOR = 2.20462;

//tree saved constant factor
TREE_SAVED_FACTOR = 352.7396;

//Transcend power saving parameter constant
const TSPWSAVING = "transcend";

//Occupancy power saving parameter constant
const OCCUPANCYPWSAVING = "occupancy";

//Occupancy percentage saving parameter constant
const OCCUPANCYPERCENTAGE = "occupancy";

//Sensor average parameter constant
const SENSORAVERAGE = "average";

//Fixture type
const MOLEXTROFFER = "MolexTroffer";
const MOLEXDRIVER = "MolexDriver";
const MOLEXSENSOR="MolexSensor";
const MOLEXBEACON="MolexBeacon";
const MOLEX_BEACON="Molex Beacon";

//Power consumption
const TSPWCONSUME = "consumption";

// STATE Constants
const STATE_Normal = 'State';
const STATE_UPEERCASE = 'STATE';
const STATE_lowercase = 'state';

// RGB Constants
const RGB_Red_lowercase = 'red';
const RGB_Green_lowercase = 'green';
const RGB_Blue_lowercase = 'blue';

const pollingCycle_lowercase = 'pollingCycle';
module.exports = {
    FLOOR_PLAN_PATH: FLOOR_PLAN_PATH,

    //notification Types : Not used anymore : TODO - remove later
    NOTIFICATION_SENSOR_ENABLED: NOTIFICATION_SENSOR_ENABLED,
    NOTIFICATION_SENSOR_DISABLED: NOTIFICATION_SENSOR_DISABLED,

    //Audit Constants
    SIZE_LIMIT: SIZE_LIMIT,
    AUDIT_KEY: AUDIT_KEY,

    // custom audit types
    ADUIT_LEVEL: ["error", "warn", "info", "debug"],
    ADUIT_TYPE: ["system", "other", "project"],

    //UNKNOWN Constants
    UNKNOWN_Normal: UNKNOWN_Normal,
    UNKNOWN_UPEERCASE: UNKNOWN_UPEERCASE,
    UNKNOWN_lowercase: UNKNOWN_lowercase,

    //USER Constants
    USER_Normal: USER_Normal,
    USER_UPEERCASE: USER_UPEERCASE,
    USER_lowercase: USER_lowercase,


    //GENERAL Constants
    GENERAL_Normal: GENERAL_Normal,
    GENERAL_UPEERCASE: GENERAL_UPEERCASE,
    GENERAL_lowercase: GENERAL_lowercase,

     //MODE Constants
     LEGACY: legacy,
     NEXTGEN: nextgen,
 

    //INFORMATION Constants
    INFORMATION_Normal: INFORMATION_Normal,
    INFORMATION_UPEERCASE: INFORMATION_UPEERCASE,
    INFORMATION_lowercase: INFORMATION_lowercase,

    //BUILDING Constants
    BUILDING_Normal: BUILDING_Normal,
    BUILDING_UPEERCASE: BUILDING_UPEERCASE,
    BUILDING_lowercase: BUILDING_lowercase,


    // SHADES Constants
    SHADES_Normal: SHADES_Normal,
    SHADES_UPEERCASE: SHADES_UPEERCASE,
    SHADES_lowercase: SHADES_lowercase,

    //SHADING Constants
    SHADING_Normal: SHADING_Normal,
    SHADING_UPEERCASE: SHADING_UPEERCASE,
    SHADING_lowercase: SHADING_lowercase,

    // BEACON Constants
    BEACON_Normal: BEACON_Normal,
    BEACON_UPEERCASE: BEACON_UPEERCASE,
    BEACON_lowercase: BEACON_lowercase,

    // BRIGTHNESS Constants
    BRIGTHNESS_Normal: BRIGTHNESS_Normal,
    BRIGTHNESS_UPEERCASE: BRIGTHNESS_UPEERCASE,
    BRIGTHNESS_lowercase: BRIGTHNESS_lowercase,

    // IMMERSION Constants
    IMMERSION_Normal: IMMERSION_Normal,
    IMMERSION_UPEERCASE: IMMERSION_UPEERCASE,
    IMMERSION_lowercase: IMMERSION_lowercase,

    // SATURATION Constants
    SATURATION_Normal: SATURATION_Normal,
    SATURATION_UPEERCASE: SATURATION_UPEERCASE,
    SATURATION_lowercase: SATURATION_lowercase,

    // BIOADAPTIVE Constants
    BIOADAPTIVE_Normal: BIOADAPTIVE_Normal,
    BIOADAPTIVE_UPEERCASE: BIOADAPTIVE_UPEERCASE,
    BIOADAPTIVE_lowercase: BIOADAPTIVE_lowercase,

    // BIODYNAMIC Constants
    BIODYNAMIC_Normal: BIODYNAMIC_Normal,
    BIODYNAMIC_UPEERCASE: BIODYNAMIC_UPEERCASE,
    BIODYNAMIC_lowercase: BIODYNAMIC_lowercase,

    // ALL Constants
    ALL_Normal: ALL_Normal,
    ALL_UPPERCASE: ALL_UPPERCASE,
    ALL_lowercase: ALL_lowercase,

    // FLOOR Constants
    FLOOR_Normal: FLOOR_Normal,
    FLOOR_UPPERCASE: FLOOR_UPPERCASE,
    FLOOR_lowercase: FLOOR_lowercase,

    // ZONE Constants
    ZONE_Normal: ZONE_Normal,
    ZONE_UPPERCASE: ZONE_UPPERCASE,
    ZONE_lowercase: ZONE_lowercase,

    // DEVICE Constants
    DEVICE_Normal: DEVICE_Normal,
    DEVICE_UPPERCASE: DEVICE_UPPERCASE,
    DEVICE_lowercase: DEVICE_lowercase,

    // BLIND Constants
    BLIND_Normal: BLIND_Normal,
    BLIND_UPPERCASE: BLIND_UPPERCASE,
    BLIND_lowercase: BLIND_lowercase,

    //FIXURE Constants
    FIXTURE_Normal: FIXTURE_Normal,
    FIXTURE_UPPERCASE : FIXTURE_UPPERCASE,
    FIXTURE_lowercase : FIXTURE_lowercase,

    //SENSOR Constants
    SENSOR_Normal: SENSOR_Normal,
    SENSOR_UPPERCASE: SENSOR_UPPERCASE,
    SENSOR_lowercase: SENSOR_lowercase,

    //CO2 Emission value
    CO2_EMISSION: CO2_EMISSION,

    //KW devision factor
    KW_DIV_FACTOR: KW_DIV_FACTOR,

    //MINUTE CONSUME FACTOR for power calculation
    A_MINUTE_CONSUME_FACTOR: A_MINUTE_CONSUME_FACTOR,
    
    //sensor SenML timeseries object: predicted size in Mb 
    SENML_OBJECT_SIZE: SENML_OBJECT_SIZE,
    
    //Sensor role
    HUMIDITY_ROLE: HUMIDITY,
    TEMPERATURE_ROLE: TEMPERATURE,
    LUX_ROLE: LUX,
    COLOR_TEMP_ROLE: COLOR_TEMPERATURE,
    OCCUPANCY_ROLE: PRESENCE,
    AIR_QUALITY_ROLE: AIR_QUALITY,
    POWER_ROLE: POWER,
    SWITCH_ROLE: SWITCH,

    //Calucaltions Unit
    NOTAVAILABLE: NOTAVAILABLE,
    KW: KW,
    WATT:WATT,
    POUND: POUND,
    KWH: KWH,
    PERCENTAGE: PERCENTAGE,
    HOUR: HOUR,
    MINUTE: MINUTE,

    FIXTURE_PW_USAGE: FIXTURE_PW_USAGE,

    KGTOPOUND_FACTOR: KGTOPOUND_FACTOR,

    MOLEXTROFFER: MOLEXTROFFER,
    MOLEXDRIVER:MOLEXDRIVER,
    MOLEXSENSOR:MOLEXSENSOR,
    MOLEXBEACON:MOLEXBEACON,
    MOLEX_BEACON:MOLEX_BEACON,


    TSPWSAVING: TSPWSAVING,
    TSPWCONSUME: TSPWCONSUME,
    OCCUPANCYPWSAVING: OCCUPANCYPWSAVING,
    OCCUPANCYPERCENTAGE: OCCUPANCYPERCENTAGE,
    SENSORAVERAGE: SENSORAVERAGE,

    TREE_SAVED_FACTOR: TREE_SAVED_FACTOR,

    //heat index (shade values)condition 
    CAUTION :CAUTION,
    EXTREME_CAUTION :EXTREME_CAUTION,
    DANGER :DANGER,
    EXTREME_DANGER :EXTREME_DANGER,

    // State Constants
    STATE_Normal: STATE_Normal,
    STATE_UPEERCASE: STATE_UPEERCASE,
    STATE_lowercase: STATE_lowercase,
    TREE_SAVED_FACTOR: TREE_SAVED_FACTOR,

    //light state 
    LIGHT_STATE_OFF_lowercase: LIGHT_STATE_OFF_lowercase,
    LIGHT_STATE_ON_lowercase: LIGHT_STATE_ON_lowercase,

    // RGB Constants
    RGB_Red_lowercase: RGB_Red_lowercase,
    RGB_Green_lowercase: RGB_Green_lowercase,
    RGB_Blue_lowercase: RGB_Blue_lowercase,

    pollingCycle_lowercase:pollingCycle_lowercase,
    //runtime behaviours
    onIdle:[ "stayOn","off","fadeout",'default'],
	afterIdleTimeout:[ "resetBrightness","resetLightscene","resetMood","cancelOff"],
	onOccupancy:[ "leaveOff","autoOn",'default']
	
};