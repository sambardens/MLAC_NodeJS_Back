import scheme from "../../database/scheme.js";
import {DataTypes} from "sequelize";
import {BapsModel} from "../baps/baps.model.js";
import {ReleaseModel} from "../release/release.model.js";

export const GenresMainModel = scheme.define('main_genres', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
}, {
    timestamps: false
})

export const GenresSubModel = scheme.define('sub_genres', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
}, {
    timestamps: false
})

export const GenresBapsModel = scheme.define('genres_baps', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})
GenresMainModel.hasMany(GenresSubModel)
GenresSubModel.belongsTo(GenresMainModel)

ReleaseModel.belongsTo(GenresMainModel, { foreignKey: 'mainGenreId',  as: 'mainGenere'})
// GenresMainModel.hasMany(ReleaseModel, { foreignKey: 'mainGenreId', as: 'mainGenere'})
ReleaseModel.belongsTo(GenresMainModel, { foreignKey: 'secondaryGenreId',  as: 'secondGeneres'})
// GenresMainModel.hasMany(ReleaseModel, { foreignKey: 'secondaryGenreId', as: 'secondGeneres'})


GenresMainModel.hasMany(BapsModel, { foreignKey: 'mainGenereId', as: 'mainGenere'})
BapsModel.belongsTo(GenresMainModel, { foreignKey: 'mainGenereId',  as: 'mainGenere'})

GenresMainModel.hasMany(BapsModel, { foreignKey: 'secondGenereId', as: 'secondGeneres'})
BapsModel.belongsTo(GenresMainModel, { foreignKey: 'secondGenereId', as: 'secondGeneres'})

GenresSubModel.belongsToMany(BapsModel, {through: GenresBapsModel, onDelete: 'CASCADE'})
BapsModel.belongsToMany(GenresSubModel, {through: GenresBapsModel, onDelete: 'CASCADE'})