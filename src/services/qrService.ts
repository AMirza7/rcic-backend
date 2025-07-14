import { QRConnector } from '../models/qrConnector';
import { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

const CODE_LENGTH = 6;
const EXPIRY_MINUTES = 15;

/** Generate a random numeric code of length N */
function randomCode(length = CODE_LENGTH): string {
  let code = '';
  for (let i = 0; i < length; i++) {
    code += Math.floor(Math.random() * 10);
  }
  return code;
}

/**
 * Persist a new QRConnector for this consultant
 */
export async function createQRConnector(consultantId: string) {
  const code = randomCode();
  const expiresAt = new Date(Date.now() + EXPIRY_MINUTES * 60_000);
  return QRConnector.create({
    id: uuidv4(),
    consultantId,
    code,
    expiresAt,
    used: false,
  });
}

/**
 * Validate connector + code, mark used if valid
 */
export async function validateQRCode(connectorId: string, code: string) {
  const connector = await QRConnector.findOne({
    where: {
      id: connectorId,
      code,
      used: false,
      expiresAt: { [Op.gt]: new Date() },
    },
  });
  if (!connector) {
    throw new Error('Invalid or expired QR code');
  }
  connector.used = true;
  await connector.save();
  return connector;
}
