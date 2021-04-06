

var globals = {

  custom_field: 'Customer',
  order_num: 'Order Number',
  trans_id: 'Transaction ID',
  seller_id: 'Seller ID',
  payee: 'Payee',
  revenue: 'Revenue',
  gp: 'Gross Profit',
  attainment: 'Attainment',
  payout: 'Payout',
  split: 'Split Percent',
  location: 'Location',
  multiplier: 'Multiplier',
  date: 'Date',
  rule: 'Rule',
  type: 'Type',
  payout_id: 'Payout ID',
  period_id: 'Period Number',
  payee_id: 'Payee ID',
  seller: 'Seller',
  month: 'Month',
  rate: 'Rate',
  trans_import_fields: ['trans_id','seller_id','type','date','revenue','gp','order_num','transaction_location','split_percent','custom_field','payout_multiplier'],
  rates_import_fields:['rate_id','attainment_rule_id','rate_type','start','end','attain_start','attain_end','tier','rate'],
  users_import_fields:['user_id','name','plan_id','user_location','annual_ti'],
  goals_import_fields:['goal_id','user_id','attainment_rule_id','start','end','goal'],
  accounts_import_fields:['user_id','username','password','role'],
  role_import_fields:['user_id','mgr_id','level','dept']







}

export default globals
