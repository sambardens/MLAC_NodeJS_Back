import releaseService from "./release.service.js";

class ReleaseController {

    async createRelease(req, res, next) {
        try {
            const {name, type, urlLogo, releaseSpotifyId, auddSocialLink, releaseDate, label, mainGenreId, 
                secondaryGenreId, subGenresIds, designId, totalTracks, upc, copyrights, releasePrice } = req.body
            const {bapId} = req.params
            const logo = req?.files?.logo
            const {user} = req
            const release = await releaseService.createRelease(user, bapId, {
                name, type, logo, urlLogo, releaseSpotifyId, auddSocialLink, releaseDate, label, mainGenreId, 
                secondaryGenreId, subGenresIds, designId, totalTracks, upc, copyrights, releasePrice
            })
            return res.json({success: true, release})
        } catch(e) {
            next(e)
        }
    }

    async getReleases(req, res, next) {
        try {
            const {bapId} = req.params
            const releases = await releaseService.getReleases({bapId})
            return res.json({success: true, releases})
        } catch(e) {
            next(e)
        }
    }

    async getTracksStreamingLinks(req, res, next) {
        try {
            const {releaseSpotifyId} = req.params
            const release = await releaseService.getTracksStreamingLinks(releaseSpotifyId)
            return res.json({success: true, release})
        } catch(e) {
            next(e)
        }
    }

    async editRelease(req, res, next) {
        try {
            const { releaseId } = req.params
            const { name, type, urlLogo, releaseSpotifyId, releaseDate, label, mainGenreId, secondaryGenreId, subGenresIds, designId, totalTracks, evearaGenreIds, distributeDate,
                upc, spotifyUri, copyrights, releasePrice, evearaLabelId, appleMusicReleasePriceId, appleMusicTrackPriceId, amazonReleasePriceId, amazonTrackPriceId } = req?.body
            const logo = req?.files?.logo
            const releases = await releaseService.editRelease(
                releaseId, 
                { name, type, logo, urlLogo, releaseSpotifyId, releaseDate, label, mainGenreId, secondaryGenreId, subGenresIds, designId, totalTracks, evearaGenreIds, distributeDate,
                    upc, spotifyUri, copyrights, releasePrice, evearaLabelId, appleMusicReleasePriceId, appleMusicTrackPriceId, amazonReleasePriceId, amazonTrackPriceId }
            )
            return res.json({success: true, releases})
        } catch(e) {
            next(e)
        }
    }

    async editReleaseAllTracksStreamingLinks(req, res, next) {
        try {
            const {releaseSpotifyId} = req.params;
            const {allTracksStreamingLinks} = req.body;
            const release = await releaseService.editReleaseAllTracksStreamingLinks(releaseSpotifyId, allTracksStreamingLinks);
            return res.json({success: true, release})
        } catch (e) {
            next(e)
        }
    }

    async uniqueFields(req, res, next) {
        try {
            const uniqueFields = await releaseService.uniqueFields()
            return res.json({success: true, uniqueFields})
        } catch(e) {
            next(e)
        }
    }

    async getAllReleases(req, res, next) {
        try {
            const {orderBy, sortOrder, type, mainGenre, subGenres, performer} = req.query
            const releases = await releaseService.getAllReleases({type, mainGenre, subGenres, performer}, orderBy, sortOrder)
            return res.json({success: true, releases})
        } catch(e) {
            next(e)
        }
    }

    async getReleaseWithTrack(req, res, next) {
        try {
            const {releaseId} = req.params
            const releases = await releaseService.getReleaseWithTrack(releaseId)
            return res.json({success: true, releases})
        } catch(e) {
            next(e)
        }
    }

    async updateReleaseAsAdmin(req, res, next) {
        try {
            const {releaseId} = req.params;
            const {releasesStatus} = req.body
            const releases = await releaseService.updateReleaseAsAdmin({id: releaseId}, releasesStatus)
            return res.json({success: true, releases})
        } catch(e) {
            next(e)
        }
    }

    async deleteRelease(req, res, next) {
        try {
            const {releaseId} = req.params;
            const releases = await releaseService.deleteRelease(releaseId)
            return res.json({success: true})
        } catch(e) {
            next(e)
        }
    }
}

export default new ReleaseController()