// Central export for all equipment
import { LuckStone } from './enhancers/luck-stone.js';
import { LeatherArmor } from './enhancers/leather-armor.js';
import { IronLeafOakenShield } from './enhancers/iron-leaf-oaken-shield.js';
import { StaffOfBeekeeping } from './enhancers/staff-of-beekeeping.js';
export { LuckStone } from './enhancers/luck-stone.js';
export { LeatherArmor } from './enhancers/leather-armor.js';
export { IronLeafOakenShield } from './enhancers/iron-leaf-oaken-shield.js';
export { StaffOfBeekeeping } from './enhancers/staff-of-beekeeping.js';

// Equipment catalog for serialization/deserialization
export const EQUIPMENT_CATALOG = {
    [LuckStone.name]: LuckStone,
    [LeatherArmor.name]: LeatherArmor,
    [IronLeafOakenShield.name]: IronLeafOakenShield,
    [StaffOfBeekeeping.name]: StaffOfBeekeeping,
    // Add more equipment here as needed
};

/**
 * Usage:
 * To serialize: store equipment by name (e.g., item.name)
 * To deserialize: lookup by name in EQUIPMENT_CATALOG
 * Example:
 *   const item = EQUIPMENT_CATALOG[equipmentName];
 */
