export const questionData = {

  '总销售金额': '绩效周期内，线上销售金额+ 线下销售金额;\n线上销售金额 = 正向订单已支付金额（2.待请货 3.已请货 4.待提货 5.已提货 ）- 退款订单状态（1、仅退款  2、退货退款）;\n线下销售金额 = （线下门店该店员出数金额（剔除线上订单部分，避免重复计算）- 门店退款金额）;\n绩效周期内，线上订单核销数/（线上订单数+历史未核销订单数)',

  '未提货金额': '绩效周期内，门店线上订单，截止到当前未核销商品金额;\n未核销订单包括3种状态：2.待请货 3.已请货 4.待提货',

  '已提货金额': '绩效周期内， （本店线上订单已核销商品金额 -线上售后退款金额）  + （门店线下核销金额（剔除线上部分） - 门店线下退款金额）',

  '线上订单数': '线上订单数：线上成交订单数（自提点为本店的都算），剔除整单售后退款的',

  '线上订单核销数': '线上订单核销数：该门店线上成交订单里有多少核销了（部分商品及整单核销都算，但一个订单分多次核销只计算为一个核销数）剔除整单退款的',

  '核销率（%）': '店员：\n绩效周期内，线上订单核销数/（线上订单数+历史未核销订单数）\n以自提点是该店的线上订单进行计算核销率\n线上订单状态包括：2.待请货 3.已请货 4.待提货 5.已提货  以订单成交时间为准\n历史累计未核销订单：2.待请货 3.已请货 4.待提货.\n\n门店：\n1、线上订单数：在筛选日期范围内，店员/门店推广成交的线上订单数（不管订单的自提点是不是推广员工所属门店都算，例如小明属于A门店，顾客通过小明的海报进行购买，但自提点选择B门店，该订单仍属于小明的推广成交订单）；\n2、历史未核销订单数：在筛选日期范围之前，店员/门店推广成交但未曾核销过的线上订单数（若订单有部分商品已核销提货则不算，例如查询5月的业绩时，小明在4月推广的订单里有5单完全没核销过，有2单是核销了部分商品，在5月的业绩中包含的历史未核销订单数为5）；\n3、线上订单核销数：在筛选日期范围内，到店核销的线上订单数（本月推广成交及历史未核销订单，在本月进行部分或整单核销都记入核销单数，但同一个订单分多次核销只计为一个核销单数，即进行去重，例如本月推广成交的订单中有5单进行核销，历史未核销订单中有3单在本月进行核销，则本月的线上订单核销数为8）。\n线上订单状态包括：2.待请货 3.已请货 4.待提货 5.已提货  以订单成交时间为准.\n历史累计未核销订单：2.待请货 3.已请货 4.待提货',

  '门店目标核销金额': '绩效周期内，门店核销金额目标',

  '目标完成率（%）': '这里是指门店的目标完成率，由于会影响个人业绩分成比例，所以在个人区域也显示\n1、目标完成率：核销金额/目标核销金额\n1）若未达标，则为基础提成，若门店达标，则为完成目标提成\n2）推广次数、核销率、投诉次数人意项不达标提成减半',

  '提成金额': '已提货金额*提点',

  '门店集体提成金额': '门店集体提成金额：线上非员工业绩提成+门店非员工业绩提成.\n1、门店提成金额中有多少是未记录推广员工，属于集体提成的；\n2、若本店未达标，只获得基础提点，若本店达标，可获得完成目标提点\n3、线上非员工业绩提成 = 自提点为该门店的订单，没有推荐员工的，线上已核销金额的提成\n4、门店非员工业绩提成 = 商品活动时间内门店出数，没有员工ID的已核销金额的提成\n5、提点用个人提点基数'
}