const sqlite3 = require('sqlite3');

class DBAbstraction {
    constructor(fileName) {
        this.fileName = fileName;
    }

    init() {
        return new Promise((resolve, reject) => {
            this.db = new sqlite3.Database(this.fileName, async (err) => {
                if (err) {
                    reject(err);
                } else {
                    try {
                        await this.createTables();
                        await this.insertGame("Standard");
                        resolve();
                    } catch (err) {
                        reject(err)
                    }
                }
            });
        });
    }

    createTables() {
        const sql = ` 
            CREATE TABLE IF NOT EXISTS 'Cards' (  
                'Id' INTEGER,  
                'PlayerCard' TEXT,  
                'GameId' INTEGER,
                FOREIGN KEY("GameId") REFERENCES "Games"("Id"),
                PRIMARY KEY('Id') 
            );             
            CREATE TABLE IF NOT EXISTS 'BallsCalled' (  
                'Id' INTEGER,  
                'BallNum' INTEGER,  
                'GameId' INTEGER,
                FOREIGN KEY("GameId") REFERENCES "Games"("Id"),
                PRIMARY KEY('Id') 
            );             
            CREATE TABLE IF NOT EXISTS 'Games' (  
                'Id' INTEGER,  
                'Type' TEXT,  
                PRIMARY KEY('Id') 
            );             
        `;

        return new Promise((resolve, reject) => {
            this.db.exec(sql, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    getBallsCalledByGame(GameId) {
        const sql = ` 
            SELECT BallNum
            FROM BallsCalled
            WHERE GameId = ?
        `;
        return new Promise((resolve, reject) => {
            this.db.all(sql, [GameId], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    insertGame(Type) {
        const sql = 'INSERT INTO Games (Type) VALUES (?);';
        return new Promise((resolve, reject) => {
            this.db.all(sql, [Type], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    }

    insertCard(bingoCardStr, GameId) {
        const sql = 'INSERT INTO Cards (PlayerCard, GameId) VALUES (?,?) RETURNING GameId;';
        return new Promise((resolve, reject) => {
            this.db.all(sql, [bingoCardStr, GameId], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    }

    deleteCardsByGame(GameId) {
        const sql = 'DELETE FROM Cards WHERE GameId = ?;';
        return new Promise((resolve, reject) => {
            this.db.all(sql, [GameId], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    }

    deleteGame(GameId) {
        const sql = 'DELETE FROM Games WHERE Id = ?;';
        return new Promise((resolve, reject) => {
            this.db.all(sql, [GameId], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    }

    insertBallCalled(BallNum, GameId) {
        const sql = 'INSERT INTO BallsCalled (BallNum, GameId) VALUES (?,?);';
        return new Promise((resolve, reject) => {
            this.db.all(sql, [BallNum, GameId], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    }

    deleteBallsCalledByGame(GameId) {
        const sql = 'DELETE FROM BallsCalled WHERE GameId = ?;';
        return new Promise((resolve, reject) => {
            this.db.all(sql, [GameId], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    }

    getAllCardsByGame(GameId) {  
        const sql = ` 
            SELECT PlayerCard
            FROM Cards
            WHERE GameId = ?
        `; 
 
        return new Promise((resolve, reject) => { 
            this.db.all(sql, [GameId], (err, rows) => {                 
                if(err) { 
                    reject(err); 
                } else { 
                    resolve(rows); 
                } 
            }); 
        }); 
    } 
}

module.exports = DBAbstraction;