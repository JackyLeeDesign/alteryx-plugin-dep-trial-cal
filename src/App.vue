<template>
  <div class="container-fluid">
    <!-- PwC logo -->
    <div class="row">
      <div class="col">
        <div style="margin-top:20px;">
          <img src="./PwC.png" style="width: 100px;">
        </div>
      </div>
    </div>

    <!-- 主要內容 -->
    <div class="row">
      <div class="col">
        <!-- 第一步 -->
        <div class="card" style="margin-top:10px;">
          <div class="card-header d-flex justify-content-between align-items-center">
            <b>Step1：請連結財產目錄 Excel 檔案：</b>
          </div>
          <div class="card-body" style="overflow-x:auto;">
            <label for="exampleFormControlInput1" class="form-label"><b>
                <BIconFiles style="vertical-align:text-top;" class="icon" />本元件將依客戶所提供之財產目錄進行試算。
              </b></label>
            <div class="mb-3">
              <b v-if="legder_status === true" style="color:green;">
                <BIconCheckLg style="vertical-align:text-top;" class="icon" /> 已連接完成
              </b>
              <b v-if="legder_status !== true" style="color:red;">
                <BIconExclamationTriangleFill style="vertical-align:text-top;" class="icon" /> {{ legder_status }}
              </b>
            </div>
          </div>
        </div>

        <!-- 第二步 -->
        <div class="card" style="margin-top:10px;">
          <div class="card-header d-flex justify-content-between align-items-center"><b>Step2：請輸入其對應欄位：</b>
          </div>
          <div class="card-body" style="overflow-x:auto;">
            <!-- 資產分類(編號) -->
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label"><b>
                  <BIconColumns style="vertical-align:text-top;" class="icon" /> 資產分類(編號)
                </b></label>
              <br>
              <label for="exampleFormControlInput1" class="form-label">
                請選擇對應欄：
              </label>
              <select class="form-control" v-model="assets_num_col">
                <option disabled value="">選擇欄位</option>
                <option v-for="item, index in columns" v-bind:key="index">{{ item }}</option>
              </select>
            </div>

            <!-- 資產分類(名稱) -->
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label"><b>
                  <BIconColumns style="vertical-align:text-top;" class="icon" /> 資產分類(名稱)
                </b></label>
              <br>
              <label for="exampleFormControlInput1" class="form-label">
                請選擇對應欄：
              </label>
              <select class="form-control" v-model="assets_name_col">
                <option disabled value="">選擇欄位</option>
                <option v-for="item, index in columns" v-bind:key="index">{{ item }}</option>
              </select>
            </div>

            <!-- 固定資產成本 -->
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label"><b>
                  <BIconColumns style="vertical-align:text-top;" class="icon" /> 固定資產成本
                </b></label><br>
              <label for="exampleFormControlInput1" class="form-label">
                請選擇對應欄：
              </label>
              <select class="form-control" v-model="asset_cost_col">
                <option disabled value="">選擇欄位</option>
                <option v-for="item, index in columns" v-bind:key="index">{{ item }}</option>
              </select>
            </div>

            <!-- 耐用年限(折舊率) -->
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label"><b>
                  <BIconColumns style="vertical-align:text-top;" class="icon" /> 耐用年限(折舊率)
                </b></label><br>
              <label for="exampleFormControlInput1" class="form-label">
                請選擇對應欄：
              </label>
              <select class="form-control" v-model="durable_period_col">
                <option disabled value="">選擇欄位</option>
                <option v-for="item, index in columns" v-bind:key="index">{{ item }}</option>
              </select><br>
              <input type="checkbox" class="form-check-input" v-model="is_durable_period_year" /> 
              <label for="exampleFormControlInput1" class="form-check-label"><b>
                耐用年限單位是否為年份(若否則為月份)
                </b></label>
            </div>

            <!-- 預留殘值 -->
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label"><b>
                  <BIconColumns style="vertical-align:text-top;" class="icon" /> 預留殘值
                </b></label><br>
              <label for="exampleFormControlInput1" class="form-label">
                請選擇對應欄：
              </label>
              <select class="form-control" v-model="reserved_residual_values_col">
                <option disabled value="">選擇欄位</option>
                <option v-for="item, index in columns" v-bind:key="index">{{ item }}</option>
              </select>
            </div>

            <!-- 折舊起始日期 -->
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label"><b>
                  <BIconColumns style="vertical-align:text-top;" class="icon" /> 折舊起始日期
                </b></label><br>
              <label for="exampleFormControlInput1" class="form-label">
                請選擇對應欄：
              </label>
              <select class="form-control" v-model="dep_start_date_col">
                <option disabled value="">選擇欄位</option>
                <option v-for="item, index in columns" v-bind:key="index">{{ item }}</option>
              </select>
              <br>
              <label for="exampleFormControlInput1" class="form-label">
                請選擇折舊月份計算方式：
              </label>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="dep_trial_way1" value="1"
                  v-model="dep_trial_way">
                <label class="form-check-label" for="inlineRadio1">下個月計算</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="dep_trial_way2" value="0"
                  v-model="dep_trial_way">
                <label class="form-check-label" for="inlineRadio2">15 天為期</label>
              </div>
            </div>

            <!-- 本期提列數 -->
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label"><b>
                  <BIconColumns style="vertical-align:text-top;" class="icon" /> 本期提列數
                </b></label>
              <br>
              <label for="exampleFormControlInput1" class="form-label">
                請選擇對應欄：
              </label>
              <select class="form-control" v-model="amount_of_this_period_col">
                <option disabled value="">選擇欄位</option>
                <option v-for="item, index in columns" v-bind:key="index">{{ item }}</option>
              </select>
            </div>
          </div>
        </div>

        <!-- 第三步 -->
        <div class="card" style="margin-top:10px;">
          <div class="card-header d-flex justify-content-between align-items-center">
            <b>Step3：請選擇欲排除之資產編號，系統將不進行試算</b>
          </div>
          <div class="card-body" style="overflow-x:auto;">
            <div class="mb-3">
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineDepDetermineRadioOptions"
                  id="dep_determine_way1" value="1" v-model="is_determine_num">
                <label class="form-check-label" for="inlineRadio1">按資產編號進行排除</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineDepDetermineRadioOptions"
                  id="dep_determine_way2" value="0" v-model="is_determine_num">
                <label class="form-check-label" for="inlineRadio2">按資產名稱進行排除</label>
              </div>
              <div class="form-check mb-3">
                <label for="exampleFormControlInput1" class="form-check-label"><b>
                    {{ is_determine_num == "1" ? "請輸入不計入折舊費用計算的資產編號抬頭代表號：" : "請輸入不計入折舊費用計算的資產名稱：" }}
                  </b></label>
                <input type="text" id="determine_num1" class="form-control"
                  :placeholder="is_determine_num == 1 ? '請輸入資產編號' : '請輸入資產名稱'" v-model="no_cal_keyword">
              </div>
            </div>
          </div>
        </div>

        <!-- 第四步 -->
        <div class="card" style="margin-top:10px;">
          <div class="card-header d-flex justify-content-between align-items-center">
            <b>Step4：請選擇試算結果存放資料夾路徑<br>(註:儲存檔名為 PwC_折舊費用試算_YYYY-MM-DD hh-mm-ss.xlsx)</b>
          </div>
          <div class="card-body" style="overflow-x:auto;">
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label"><b>
                <BIconFiles style="vertical-align:text-top;" class="icon" />請選擇資料夾：
              </b></label>
              <ayx data-ui-props='{type:"FileBrowse", widgetId:"save_dir", browseType:"Folder"}'></ayx>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <footer class="footer mt-auto">
    <p class="text-muted" style="margin: 0px;text-align: center;">版本：0.2.0</p>
  </footer>

</template>
<script>
//replaceAll Polyfill

/**
 * String.prototype.replaceAll() polyfill
 * https://gomakethings.com/how-to-replace-a-section-of-a-string-with-another-one-with-vanilla-js/
 * @author Chris Ferdinandi
 * @license MIT
 */
if (!String.prototype.replaceAll) {
  String.prototype.replaceAll = function (str, newStr) {

    // If a regex pattern
    if (Object.prototype.toString.call(str).toLowerCase() === '[object regexp]') {
      return this.replace(str, newStr);
    }

    // If a string
    return this.replace(new RegExp(str, 'g'), newStr);

  };
}

//Clean Punctuation
String.prototype.clsPunc = function () {
  return this.replace(/[\p{P}\p{S}\p{Z}]/gu, '').toLowerCase()
}


export default {
  name: 'files',
  data() {
    return {
      // 寫入 Altreyx 參數
      assets_num_col: "", // 資產分類編號
      assets_name_col: "", // 資產分類名稱
      asset_cost_col: "", // 固定資產成本
      durable_period_col: "", // 耐用年限
      is_durable_period_year:true, //耐用年限是否為年份
      reserved_residual_values_col: "", // 預留殘值
      dep_start_date_col: "", // 折舊起始日期
      amount_of_this_period_col: "", // 本期提列數
      no_cal_keyword: "", // 欲排除之會科關鍵字
      dep_trial_way: "0", // 折舊起算方式, 0=>15天為期, 1=>下個月計算
      input_isConnectFile: false,
      is_determine_num: "1", // 是否依會科判斷
      save_dir: "", // 儲存路徑

      // 畫面控制相關參數
      str_columns: [],
      val_columns: [],
      columns: []
      // help_1:false,
    }
  },
  components: {
  },
  watch: {
    save_dir: {
      handler(val) {
        if (typeof window.Alteryx !== 'undefined') {
          window.Alteryx.Gui.Manager.getDataItem("save_dir").setValue(val)
        }
      },
      deep: true
    },
    assets_num_col: {
      handler(val) {
        if (typeof window.Alteryx !== 'undefined') {
          window.Alteryx.Gui.Manager.getDataItem("assets_num_col").setValue(val)
        }
      },
      deep: true
    },
    assets_name_col: {
      handler(val) {
        if (typeof window.Alteryx !== 'undefined') {
          window.Alteryx.Gui.Manager.getDataItem("assets_name_col").setValue(val)
        }
      },
      deep: true
    },
    asset_cost_col: {
      handler(val) {
        if (typeof window.Alteryx !== 'undefined') {
          window.Alteryx.Gui.Manager.getDataItem("asset_cost_col").setValue(val)
        }
      },
      deep: true
    },
    durable_period_col: {
      handler(val) {
        if (typeof window.Alteryx !== 'undefined') {
          window.Alteryx.Gui.Manager.getDataItem("durable_period_col").setValue(val)
        }
      },
      deep: true
    },
    is_durable_period_year: {
      handler(val) {
        if (typeof window.Alteryx !== 'undefined') {
          window.Alteryx.Gui.Manager.getDataItem("is_durable_period_year").setValue(val)
        }
      },
      deep: true
    },
    reserved_residual_values_col: {
      handler(val) {
        if (typeof window.Alteryx !== 'undefined') {
          window.Alteryx.Gui.Manager.getDataItem("reserved_residual_values_col").setValue(val)
        }
      },
      deep: true
    },
    dep_start_date_col: {
      handler(val) {
        if (typeof window.Alteryx !== 'undefined') {
          window.Alteryx.Gui.Manager.getDataItem("dep_start_date_col").setValue(val)
        }
      },
      deep: true
    },
    amount_of_this_period_col: {
      handler(val) {
        if (typeof window.Alteryx !== 'undefined') {
          window.Alteryx.Gui.Manager.getDataItem("amount_of_this_period_col").setValue(val)
        }
      },
      deep: true
    },
    no_cal_keyword: {
      handler(val) {
        if (typeof window.Alteryx !== 'undefined') {
          window.Alteryx.Gui.Manager.getDataItem("no_cal_keyword").setValue(val)
        }
      },
      deep: true
    },
    is_determine_num: {
      handler(val) {
        if (typeof window.Alteryx !== 'undefined') {
          window.Alteryx.Gui.Manager.getDataItem("is_determine_num").setValue(val)
        }
      },
      deep: true
    },
    length: {
      handler(val) {
        if (typeof window.Alteryx !== 'undefined') {
          window.Alteryx.Gui.Manager.getDataItem("length").setValue(val)
        }
      },
      deep: true
    },
    dep_trial_way: {
      handler(val) {
        if (typeof window.Alteryx !== 'undefined') {
          window.Alteryx.Gui.Manager.getDataItem("dep_trial_way").setValue(val)
        }
      },
      deep: true
    }
  },
  mounted() {
    if (typeof window.Alteryx !== 'undefined') {
      //Load Alteryx Library
      document.write('<link rel="import" href="' + window.Alteryx.LibDir + '2/lib/includes.html">');
      let libpath = window.Alteryx.LibDir + "2/lib/build/designerDesktop.bundle.js"
      let script = document.createElement('script')
      script.setAttribute('src', libpath)
      //Script Onload Callback
      script.onload = function () {
        //Define DataItem
        window.Alteryx.Gui.BeforeLoad = function (manager, AlteryxDataItems) {
          var assets_num_col = new AlteryxDataItems.SimpleString('assets_num_col')
          manager.addDataItem(assets_num_col)
          var assets_name_col =new AlteryxDataItems.SimpleString('assets_name_col')
          manager.addDataItem(assets_name_col)
          var asset_cost_col = new AlteryxDataItems.SimpleString('asset_cost_col')
          manager.addDataItem(asset_cost_col)
          var durable_period_col = new AlteryxDataItems.SimpleString('durable_period_col')
          manager.addDataItem(durable_period_col)
          var reserved_residual_values_col = new AlteryxDataItems.SimpleString('reserved_residual_values_col')
          manager.addDataItem(reserved_residual_values_col)
          var dep_start_date_col = new AlteryxDataItems.SimpleString('dep_start_date_col')
          manager.addDataItem(dep_start_date_col)
          var amount_of_this_period_col = new AlteryxDataItems.SimpleString('amount_of_this_period_col')
          manager.addDataItem(amount_of_this_period_col)
          var is_durable_period_year = new AlteryxDataItems.SimpleBool('is_durable_period_year')
          manager.addDataItem(is_durable_period_year)
          var no_cal_keyword = new AlteryxDataItems.SimpleString('no_cal_keyword')
          manager.addDataItem(no_cal_keyword)
          var is_determine_num = new AlteryxDataItems.SimpleString('is_determine_num')
          manager.addDataItem(is_determine_num)
          var dep_trial_way = new AlteryxDataItems.SimpleString('dep_trial_way')
          manager.addDataItem(dep_trial_way)
          var save_dir = new AlteryxDataItems.SimpleString('save_dir')
          manager.addDataItem(save_dir)
          manager.bindDataItemToWidget(save_dir, 'save_dir')
        }
        //Load Settings
        window.Alteryx.Gui.AfterLoad = function (manager) {
          //Set WorkflowDirectory
          this.assets_num_col = manager.getDataItem("assets_num_col").getValue()
          this.assets_name_col = manager.getDataItem("assets_name_col").getValue()
          this.asset_cost_col = manager.getDataItem("asset_cost_col").getValue()
          this.durable_period_col = manager.getDataItem("durable_period_col").getValue()
          this.reserved_residual_values_col = manager.getDataItem("reserved_residual_values_col").getValue()
          this.dep_start_date_col = manager.getDataItem("dep_start_date_col").getValue()
          this.amount_of_this_period_col = manager.getDataItem("amount_of_this_period_col").getValue()
          this.is_durable_period_year = manager.getDataItem("is_durable_period_year").getValue()
          this.dep_trial_way = manager.getDataItem("dep_trial_way").getValue()
          this.no_cal_keyword = manager.getDataItem("no_cal_keyword").getValue()
          this.is_determine_num = manager.getDataItem("is_determine_num").getValue()
          this.save_dir = manager.getDataItem("save_dir").getValue()

          if(this.is_determine_num == ""){
            this.is_determine_num = "1"
          }
          if(this.is_durable_period_year == ""){
            this.is_durable_period_year = true
          }
          if(this.dep_trial_way == ""){
            this.dep_trial_way = "0"
          }

          // Load Income Field
          let str_type = ["String", "WString", "V_String", "V_WString", "Date", "Time", "DateTime"]
          let val_type = ["Byte", "Int16", "Int32", "Int64", "FixedDecimal", "Float", "Double"]
          let incomingFields = manager.getIncomingFields()
          this.str_columns = incomingFields.filter(item => str_type.indexOf(item.strType) > -1).map(item => item.strName)
          this.val_columns = incomingFields.filter(item => val_type.indexOf(item.strType) > -1).map(item => item.strName)
          this.columns = this.str_columns.concat(this.val_columns)

          if ((this.str_columns.length + this.val_columns.length) === 0) {
            this.input_isConnectFile = false;
          }
          else {
            this.input_isConnectFile = true;
          }
        }.bind(this)
      }.bind(this)
      //Load Script
      document.head.appendChild(script)
    }
  },
  computed: {
    legder_status: function () {
      try {
        //是否連接資料
        if ((this.str_columns.length + this.val_columns.length) === 0) {
          throw `尚未連結檔案或檔案無資料`
        }
        return true
      } catch (err) {
        return err
      }
    },
  },
  methods: {
  }
}
</script>

<style>
#app {
  font-family: "Helvetica Neue", Helvetica, Arial, "Microsoft JhengHei", "PingFang TC", "Heiti TC", sans-serif;
  display: flex;
  flex-direction: column;
  height: 100%;
}

html,
body {
  height: 100%;
}
</style>
