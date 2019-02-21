/**
 * User: jay
 * Date: 14-1-1
 * Time: 上午10:10
 */

var _YES = "Y",
    _NO = "N",
    JBIC = "JBIC", //Filter begin
    JBDJ = "JBDJ",
    JBGH = "JBGH",
    JBQC = "JBQC",
    JBCL = "JBCL",
    JBSK = "JBSK",
    JBYZ = "JBYZ",
    JBCJ = "JBCJ", //Filter end
    JBPG = "JBPG",
    JBZJ = "JBZJ",
    JBQA = "JBQA",
    DMIC = "DMIC",
    DMQX = "DMQX",
    DMGY = "DMGY",
    DMZJ = "DMZJ",
    DMQA = "DMQA";

//var irreparableDef = "L001,L002,L006,L014,L015,L016,L017,Z005,Z006,Z008,Z010,Z011,Z014,";
var filterProcess = {
    all : "JBIC,",
    irr : "JBDJ,JBGH,JBQC,JBCL,JBSK,JBYZ,JBCJ,JBPG,"
};

/**
 * Check does this need show
 */
var _isNeed = function( judge_proc, defect_code, irreparableDefAry ){
    return 0 <= filterProcess.all.indexOf(judge_proc) ||
        0 <= filterProcess.irr.indexOf(judge_proc) && 0 <= $.inArray(defect_code, irreparableDefAry);
};

var _showDefRule = {
    //TODO Test ->
//    JBDJ : {             //当前制程
//        cusDef : _YES,      //是否显示来料不良
//        cDefProcs : [],     //需要显示哪些制程判定的来料不良（空数组标识显示全部）
//        processDef : _YES,  //是否显示制程不良
//        pDefProcs : []      //需要显示哪些制程判定的制程不良（空数组标识显示全部）
//    },
    // <- Test
    JBIC : {
        cusDef : _YES,
        cDefProcs : [],
        processDef : _NO,
        pDefProcs : [],
        needFilter : _NO
    },
    JBGH : {
        cusDef : _NO,
        cDefProcs : [],
        processDef : _YES,
        pDefProcs : [JBDJ],
        needFilter : _NO
    },
    JBQC : {
        cusDef : _YES,
        cDefProcs : [JBIC],
        processDef : _YES,
        pDefProcs : [],
        needFilter : _NO
    },
    JBCL : {
        cusDef : _NO,
        cDefProcs : [],
        processDef : _YES,
        pDefProcs : [],
        needFilter : _NO
    },
    JBSK : {
        cusDef : _NO,
        cDefProcs : [],
        processDef : _YES,
        pDefProcs : [],
        needFilter : _NO
    },
    JBYZ : {
        cusDef : _YES,
        cDefProcs : [JBIC, JBQC],
        processDef : _YES,
        pDefProcs : [],
        needFilter : _NO
    },
    JBCJ : {
        cusDef : _YES,
        cDefProcs : [JBIC, JBQC, JBYZ],
        processDef : _YES,
        pDefProcs : [],
        needFilter : _NO
    },
    /* Need filter begin */
    JBPG : {
        cusDef : _YES,
        cDefProcs : [JBIC, JBQC, JBYZ, JBCJ],
        processDef : _YES,
        pDefProcs : [],
        needFilter : _YES
    },
    JBZJ : {
        cusDef : _YES,
        cDefProcs : [JBPG],
        processDef : _YES,
        pDefProcs : [JBPG],
        needFilter : _YES
    },
    JBQA : {
        cusDef : _YES,
        cDefProcs : [JBPG, JBZJ],
        processDef : _YES,
        pDefProcs : [JBPG, JBZJ],
        needFilter : _YES
    },
    DMIC : {
        cusDef : _YES,
        cDefProcs : [JBPG, JBZJ, JBQA],
        processDef : _YES,
        pDefProcs : [JBPG, JBZJ, JBQA],
        needFilter : _YES
    },
    DMGY : {
        cusDef : _NO,
        cDefProcs : [],
        processDef : _YES,
        pDefProcs : [DMQX],
        needFilter : _NO
    },
    DMZJ : {
        cusDef : _YES,
        cDefProcs : [JBPG, JBZJ, JBQA, DMIC, DMQX, DMGY],
        processDef : _YES,
        pDefProcs : [JBPG, JBZJ, JBQA, DMIC, DMQX, DMGY],
        needFilter : _YES
    },
    DMQA : {
        cusDef : _YES,
        cDefProcs : [JBPG, JBZJ, JBQA, DMIC, DMQX, DMGY, DMZJ],
        processDef : _YES,
        pDefProcs : [JBPG, JBZJ, JBQA, DMIC, DMQX, DMGY, DMZJ],
        needFilter : _YES
    }
};