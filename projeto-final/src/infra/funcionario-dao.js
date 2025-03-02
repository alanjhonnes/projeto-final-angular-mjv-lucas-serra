const converterFuncionario = row => ({
    user_id: row.id,
    user_name: row.nome,
    user_email:row.email, 
    user_password
});


class FuncionarioDao {

    constructor(db) {
        this._db = db;
    }

    findByEmailAndPassword(user_email, user_password) {
        return new Promise((resolve, reject) => this._db.query(
            `SELECT * FROM funcionario WHERE email = ? AND senha = ?`,
            [user_email, user_password],
            (err, row) => {
                if (err) {
                    console.log(err);
                    return reject('Can`t find employee');
                }
                 
                if(row) resolve(converterFuncionario(row));
                resolve(null);
            }
        ));
    }

    findByName(user_name) {

        return new Promise((resolve, reject) => this._db.query(
            `SELECT * FROM funcionario WHERE nome = ?`,
            [user_name],
            (err, row) => {
                if (err) {
                    console.log(err);
                    return reject('Can`t find employee');
                }
                 
                if(row) resolve(converterFuncionario(row));
                resolve(null);
            }
        ));
        
    }

    add(funcionario) {
        return new Promise((resolve, reject) => {
            
            this._db.query(`
                INSERT INTO funcionario (
                    nome,
                    profissao,
                    salario, 
                    cpf, 
                    celular,
                    matricula,
                    email,
                    senha
                ) values (?,?,?,?,?,?,?,?)
            `,
                [
                    funcionario.nome,
                    funcionario.profissao,
                    funcionario.salario, 
                    funcionario.cpf,
                    funcionario.celular,
                    funcionario.matricula,
                    funcionario.email,
                    funcionario.senha
                ],
                function (err) {
                    if (err) {
                        console.log(err);
                        return reject('Can`t register new employee');
                    }
                    console.log(`User ${funcionario.nome} registered!`)
                    resolve();
                });
        });
    }

}
module.exports = FuncionarioDao;