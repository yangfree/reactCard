const express = require("express")
const router = express.Router()

const mobile_prj001 = require('./prj001/mobile_prj001')
const mobile_prj002 = require('./prj002/mobile_prj002')
const mobile_prj003 = require('./prj003/mobile_prj003')
const mobile_prj004 = require('./prj004/mobile_prj004')
const mobile_prj005 = require('./prj005/mobile_prj005')
const mobile_prj006 = require('./prj006/mobile_prj006')

router.use('/prj001',mobile_prj001)
router.use('/prj002',mobile_prj002)
router.use('/prj003',mobile_prj003)
router.use('/prj004',mobile_prj004)
router.use('/prj005',mobile_prj005)
router.use('/prj006',mobile_prj006)

module.exports = router
