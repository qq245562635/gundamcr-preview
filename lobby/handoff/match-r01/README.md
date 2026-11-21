# match-r01 — T2

依据33 §5 T2。含6张PNG：规定的雷达、标题条、贴士框、红按钮，加独立扫描扇面和中性导航轨道。全部无文字，文字实时绘制。

- `UI_FDLobby_Match_Radar.png`：640×640静态扫描圈与几何模型。
- `UI_FDLobby_Match_Radar_Sweep.png`：640×640透明扇面，与雷达同坐标，pivot=(0.5,0.5)，绕中心旋转。不得旋转整个背景/雷达底。
- `UI_FDLobby_Match_TitleBar.png`：900×160，九宫格20。
- `UI_FDLobby_Match_TipBox.png`：900×260，九宫格20。
- `UI_FDLobby_Button_Red.png`：420×140，与既有黄/白按钮同规格，同源装甲材质经原生颜色矩阵变体处理；九宫格[24,18,24,18]。可用于取消匹配、退出对局。
- `UI_FDLobby_NavRail_Neutral.png`：907×125，去掉原底板固定中部的选中块。选中块复用asym-r01的NavSelected，作为独立层移动。

`layout.json`给出L07坐标与导航状态参数；`slices.json`的borderLTRB为左/上/右/下，导入Unity时转换。只对标交互；复用已确认VS装甲背景及r02材质，无CR截图、机体形象或官方Logo。

效果图：`../../mockups/r06/L07_matching.png`与`C20b_nav_states.png`。导航表展示五种视觉选中态及50%滑动帧；商店/图鉴/活动仍锁定，样式示意不代表开放功能。仅选中项显示文字，其他只显示图标与锁。

离线复建：`python tools/build_lobby_match.py` → `python tools/export_svg.py DesignDocs/ui/lobby/handoff/match-r01` → `python tools/build_lobby_match.py --mockups` → `python tools/export_svg.py DesignDocs/ui/lobby/mockups/r06`。依赖T1构图工具、Pillow与系统librsvg/cairo。

已检查PNG解码、尺寸、透明扇面与素材布局；未做网页/真机验收，未修改原型/CSS。匹配与滑动动画由接入端实现，本包是素材和静态关键帧。
