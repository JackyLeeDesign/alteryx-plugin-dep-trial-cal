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
            <b>Step1：請選則財產目錄 Excel 檔案與其對應的工作表：</b>
          </div>
          <div class="card-body" style="overflow-x:auto;">
            <label for="exampleFormControlInput1" class="form-label"><b>
                <BIconFiles style="vertical-align:text-top;" class="icon" />本元件將依客戶所提供之財產目錄進行試算。
              </b></label>
            <br>
            <label>請選擇客戶提供之 財產目錄 Excel 檔案</label>
            <div class="input-group mb-3">
              <input type="file" id="selectExcelButton" class="form-control" @change="onExcelChange"
                accept=".xls,.xlsx">
            </div>
            <!-- <ayx data-ui-props='{type:"FileBrowse", widgetId:"excel_path", browseType:"File"}'>
            </ayx> -->
            <label>請選擇 財產目錄 工作表</label>
            <select class="form-control" v-model="selected_sheet" id="selectExcelButton" @change="onSheetChange">
              <option v-for="sheet, index in this.dataSheetList" v-bind:key="index">{{ sheet }}</option>
            </select>
          </div>
        </div>

        <!-- 第二步 -->
        <div class="card" style="margin-top:10px;">
          <div class="card-header d-flex justify-content-between align-items-center">
            <b>Step2：因每間客戶的財務報表格式不同，請輸入財務目錄資料的起始列：</b>
          </div>
          <div class="card-body" style="overflow-x:auto;">
            <label for="exampleFormControlInput1" class="form-label"><b>
                <BIconColumns style="vertical-align:text-top;" class="icon" /> Excel 資料起始列
              </b><br>(註: 起始列不需包含標題，Altreyx 將從起始列開始讀取資料，此步驟目的是避免被標題影響試算結果)
            </label>
            <input type="text" id="start_row" class="form-control" placeholder="請輸入數字 ex:1,2,3..." v-model="start_row">
          </div>
        </div>

        <!-- 第三步 -->
        <div class="card" style="margin-top:10px;">
          <div class="card-header d-flex justify-content-between align-items-center"><b>Step3：以下為試算時所需欄位，請輸入其對應資訊：</b>
          </div>
          <div class="card-body" style="overflow-x:auto;">
            <!-- 資產分類(編號) -->
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label"><b>
                  <BIconColumns style="vertical-align:text-top;" class="icon" /> 資產分類(編號)
                </b></label>
              <br>
              <label for="exampleFormControlInput1" class="form-label">
                請輸入當前 Excel 所在行：
              </label>
              <input type="text" id="assets_num_col" class="form-control" placeholder="請輸入字母 ex:A, B... or AA, AB..."
                v-model="assets_num_col">
            </div>

            <!-- 固定資產成本 -->
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label"><b>
                  <BIconColumns style="vertical-align:text-top;" class="icon" /> 固定資產成本
                </b></label><br>
              <label for="exampleFormControlInput1" class="form-label">
                請輸入當前 Excel 所在行：
              </label>
              <input type="text" id="asset_cost_col" class="form-control" placeholder="請輸入字母 ex:A, B... or AA, AB..."
                v-model="asset_cost_col">
            </div>

            <!-- 耐用年限(折舊率) -->
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label"><b>
                  <BIconColumns style="vertical-align:text-top;" class="icon" /> 耐用年限(折舊率)
                </b></label><br>
              <input type="text" id="durable_period_col" class="form-control"
                placeholder="請輸入字母 ex:A, B... or AA, AB..." v-model="durable_period_col">
            </div>

            <!-- 預留殘值 -->
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label"><b>
                  <BIconColumns style="vertical-align:text-top;" class="icon" /> 預留殘值
                </b></label><br>
              <label for="exampleFormControlInput1" class="form-label">
                請輸入當前 Excel 所在行：
              </label>
              <input type="text" id="reserved_residual_values_col" class="form-control"
                placeholder="請輸入字母 ex:A, B... or AA, AB..." v-model="reserved_residual_values_col">
            </div>

            <!-- 折舊起始日期 -->
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label"><b>
                  <BIconColumns style="vertical-align:text-top;" class="icon" /> 折舊起始日期
                </b></label><br>
              <label for="exampleFormControlInput1" class="form-label">
                請輸入當前 Excel 所在行：
              </label>
              <input type="text" id="dep_start_date_col" class="form-control"
                placeholder="請輸入字母 ex:A, B... or AA, AB..." v-model="dep_start_date_col">
              <br>
              <label for="exampleFormControlInput1" class="form-label">
                請選擇折舊起算方式：
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
                請輸入當前 Excel 所在行：
              </label>
              <input type="text" id="amount_of_this_period_col" class="form-control"
                placeholder="請輸入字母 ex:A, B... or AA, AB..." v-model="amount_of_this_period_col">
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
              <label for="exampleFormControlInput1" class="form-label"><b>
                  <BIconColumns style="vertical-align:text-top;" class="icon" /> 折舊起始日期
                </b><br>(註:左側為當前 Excel 檔案之所有資產編號，請將不進行計算之編號拖曳至右側)</label>

              <div class="form-check mb-3">
                <input type="checkbox" class="form-check-input" v-model="is_determine_specified_code" />
                <label for="exampleFormControlInput1" class="form-check-label"><b>
                    是否僅判斷會科前幾碼
                  </b></label>
                <div v-if=is_determine_specified_code>
                  <input type="text" id="amount_of_this_period_col" class="form-control" placeholder="請輸入欲判斷碼數 (數字)"
                    v-model="length">
                </div>
              </div>

              <div class="row">
                <div class="col-3 m-2">
                  <h5>資產分類(編號)</h5>
                  <draggable class="list-group" :list="assets_num_list_source" group="people" itemKey="name">
                    <template #item="{ element }">
                      <div class="list-group-item" :style="{ 'cursor': 'move' }">
                        {{ element.name }}
                      </div>
                    </template>
                  </draggable>
                </div>

                <div class="col-3 m-2">
                  <h5>欲排除之編號</h5>
                  <draggable class="list-group" :list="assets_num_list_selected" group="people" itemKey="name">
                    <template #item="{ element }">
                      <div class="list-group-item" :style="{ 'cursor': 'move' }">
                        {{ element.name }}
                      </div>
                    </template>
                  </draggable>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>

  <footer class="footer mt-auto">
    <p class="text-muted" style="margin: 0px;text-align: center;">版本：0.1.0</p>
  </footer>

</template>
<script>
import draggable from "vuedraggable";
import * as XLSX from 'xlsx'
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
      excel_file: "", //檔案資料
      workbook:"",
      excel_name: "",// 檔案名稱(含附檔名)
      start_row: 0, // 起始列
      assets_num_col: "", // 資產分類編號
      asset_cost_col: "", // 固定資產成本
      durable_period_col: "", // 耐用年限
      reserved_residual_values_col: "", // 預留殘值
      dep_start_date_col: "", // 折舊起始日期
      amount_of_this_period_col: "", // 本期提列數
      no_cal_num: "", // 欲排除之會科
      is_determine_specified_code: "", // 是否僅判斷會科前幾碼
      length: "", // 前幾碼
      dep_trial_way: 0, // 折舊起算方式, 0=>15天為期, 1=>下個月計算
      assets_num_list_source: [{ name: "File1", id: 0 },
      { name: "File2", id: 1 },
      { name: "File3", id: 2 }],
      assets_num_list_selected: [{ name: "File4", id: 0 },],
      dataSheetList: [],
      selected_sheet: "",
      isLoadExcel: false

      // 畫面控制相關參數
      // help_1:false,
    }
  },
  components: {
    draggable
  },
  watch: {
    excel_name: {
      handler(val) {
        if (typeof window.Alteryx !== 'undefined') {
          window.Alteryx.Gui.Manager.getDataItem("excel_name").setValue(val)
        }
      },
      deep: true
    },
    start_row: {
      handler(val) {
        if (typeof window.Alteryx !== 'undefined') {
          window.Alteryx.Gui.Manager.getDataItem("start_row").setValue(val)
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
    no_cal_num: {
      handler(val) {
        if (typeof window.Alteryx !== 'undefined') {
          window.Alteryx.Gui.Manager.getDataItem("no_cal_num").setValue(val)
        }
      },
      deep: true
    },
    is_determine_specified_code: {
      handler(val) {
        if (typeof window.Alteryx !== 'undefined') {
          window.Alteryx.Gui.Manager.getDataItem("is_determine_specified_code").setValue(val)
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
    },
    assets_num_list_selected: {
      handler(val) {
        console.log(val)
        // if (typeof window.Alteryx !== 'undefined') {
        //   window.Alteryx.Gui.Manager.getDataItem("dep_trial_way").setValue(val)
        // }
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
          var excel_name = new AlteryxDataItems.SimpleString('excel_name')
          manager.addDataItem(excel_name)
          var start_row = new AlteryxDataItems.SimpleString('start_row')
          manager.addDataItem(start_row)
          var assets_num_col = new AlteryxDataItems.SimpleString('assets_num_col')
          manager.addDataItem(assets_num_col)
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
          var no_cal_num = new AlteryxDataItems.SimpleString('no_cal_num')
          manager.addDataItem(no_cal_num)
          var is_determine_specified_code = new AlteryxDataItems.SimpleBool('is_determine_specified_code')
          manager.addDataItem(is_determine_specified_code)
          var length = new AlteryxDataItems.SimpleString('length')
          manager.addDataItem(length)
          var dep_trial_way = new AlteryxDataItems.SimpleString('dep_trial_way')
          manager.addDataItem(dep_trial_way)
        }
        //Load Settings
        window.Alteryx.Gui.AfterLoad = function (manager) {
          //Set WorkflowDirectory
          this.excel_name = manager.getDataItem("excel_name").getValue()
          this.start_row = manager.getDataItem("start_row").getValue()
          this.assets_num_col = manager.getDataItem("assets_num_col").getValue()
          this.asset_cost_col = manager.getDataItem("asset_cost_col").getValue()
          this.durable_period_col = manager.getDataItem("durable_period_col").getValue()
          this.reserved_residual_values_col = manager.getDataItem("reserved_residual_values_col").getValue()
          this.dep_start_date_col = manager.getDataItem("dep_start_date_col").getValue()
          this.amount_of_this_period_col = manager.getDataItem("amount_of_this_period_col").getValue()
          this.no_cal_num = manager.getDataItem("no_cal_num").getValue()
          this.is_determine_specified_code = manager.getDataItem("is_determine_specified_code").getValue()
          this.length = manager.getDataItem("length").getValue()
        }.bind(this)
      }.bind(this)
      //Load Script
      document.head.appendChild(script)
    }
  },
  computed: {
    // legder_status: function () {
    //   try {
    //     //是否連接資料
    //     if ((this.str_columns.length + this.val_columns.length) === 0) {
    //       throw `連結的檔案欄位為空 !`
    //     }
    //     return true
    //   } catch (err) {
    //     return err
    //   }
    // },
  },
  methods: {
    // Excel 檔案更改
    onExcelChange(e) {
      // 儲存選取檔案
      this.excel_file = e.target.files ? e.target.files[0] : null
      this.selected_sheet = ""
      this.workbook = ""
      // 儲存檔案名稱
      if (this.excel_file) {
        this.excel_name = this.excel_file.name
      }
      // 獲取 Excel 工作表
      this.getExcelSheet(this.excel_file)
    },
    onSheetChange() {
      // 儲存檔案
      this.readExcelData(this.selected_sheet)
    },
    getExcelSheet(file) {
      if (file) {
        var allSheetName = []
        var reader = new FileReader();
        reader.onload = e => {
          var data = e.target.result;
          var workbook = XLSX.read(data, {
            type: 'binary'
          });
          workbook.SheetNames.forEach((sheetName) =>
            this.dataSheetList.push(sheetName)
          )
          this.workbook = workbook;
        }
        reader.onerror = function (ex) {
          console.log(ex);
        };
        reader.readAsBinaryString(file);

        this.dataSheetList = allSheetName
      }
    },
    readExcelData(sheet) {
      if (this.workbook && sheet && this.assets_num_col) {
        var XLRowObject = XLSX.utils.sheet_to_json(this.workbook.Sheets[sheet], { raw: true, header: "A" });
        console.log(XLRowObject);
        var resultData = []
        XLRowObject.forEach((rowData,index)=>resultData.push({name:rowData[this.assets_num_col],id:rowData[index]}))
        console.log(resultData);
        this.assets_num_list_source = resultData
      }
    }
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
