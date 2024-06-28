import fs from "fs";
import fsp from "fs/promises";
import { Notification } from "./types";
import path from "path";

// notifications in JSON file for simplicity, store in a db for production applications

export const notificationsRepo = {
    getByEmailAndCity: getByEmailAndCity,
    saveAll: saveData,

};

async function getByEmailAndCity(email: string, city: string, state: string): Promise<Notification | undefined> {
    const jsonDirectory = path.join(process.cwd(), 'data');
    const notificationsFile = await fsp.readFile(jsonDirectory + '/notifications.json', 'utf8');
    const notifications: Notification[] = JSON.parse(notificationsFile);
    return notifications.find(
        x => x.User.Email === email
            && x.User.Location.City.toLowerCase() === city.toLowerCase()
            && x.User.Location.State.toLowerCase() == state.toLowerCase())
}

function saveData(notifications: Notification[]) {
    fs.writeFileSync('data/notifications.json', JSON.stringify(notifications, null, 4));
}