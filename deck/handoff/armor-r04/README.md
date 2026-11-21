# armor-r04 — T3 页签版

依据33 §5 T3，保持r02原生830×1896卡槽和文字坐标。配套效果图在`../../mockups/r04/`，共4张1080×2340图。

## 文件

- `base_tab.png`：830×1896无文字底板，去掉左上返回按钮壳及底部“重置/开始对战”底栏，底部留给外部导航。不烘焙卡牌、文字和导航。原版其余区域保留；修改区域原生坐标详见layout.json。
- `UI_FDDeck_MenuButton_Blue.png` / `_White.png`：240×64九宫格。补充 `_Yellow.png`用于牌库“使用”。
- `UI_FDDeck_DemoFrame.png`：820×300，九宫格14；内部场景、格挡单位方块、标题和演示文字由实时层绘制，不烘焙进框。
- `layout.json`：继承r02卡槽及文字位置，过滤back/reset/battle三个旧文本节点；1080效果图按既有x/y转换系数重组。
- `slices.json`：尺寸、alpha、SHA-256与borderLTRB（左/上/右/下），导入Unity时转换上下次序。

## 点卡与详情

点卡放大1.12倍并投影，正下方竖排按钮，宽同放大卡、高64、间隔8。牌库为“使用/信息”；卡组为“信息/替换”。**33正文§3仍写卡组只有信息，而§5本轮派单写信息/替换，本包遵循§5，并以S01c_deck_menu单独展示，供用户审图时确认。**

S03b以30§6高达示例展示数值；演示区高300，用几何方块和盾牌示意，不画机体。这里只给静态关键帧，1.5秒循环由原型/正式接入端实现。

导航依赖T2 match-r01中性底板与既有asym-r01选中块，卡组页签选中；不恢复旧底栏，不增加保存按钮，仍改完即存。

## 复建与验证

运行`python tools/build_deck_tab.py`，导出handoff目录SVG后，再用`python tools/build_deck_tab.py --mockups`生成效果图SVG，并用`tools/export_svg.py`离线导出PNG。依赖仓库r02材质与布局、T1/T2构图工具、Pillow和系统librsvg/cairo。

已做PNG解码、尺寸及布局检查；未做网页/真机/Unity验收，未改原型或CSS。
