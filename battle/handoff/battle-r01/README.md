# 战斗 battle-r01 — T1

依据 PR #22、33 §5 T1 与 31 §12。31 张 PNG 为完整要求清单；不包含机体形象、游戏截图或官方 Logo。材质来自仓库已确认的 armor-r02。

- `layout.json`：1080×2340 的 B01 HUD 坐标、塔血条、手牌、皇冠、能量十格、阶段横幅和结算布局。左上原点，rect=x/y/w/h。
- `slices.json`：全部实际尺寸、SHA-256、alpha、九宫格边距。**borderLTRB 顺序为左/上/右/下**，区别于旧包的左/下/右/上；转 Unity Sprite.border 时交换上下。全零表示 Simple。
- 顶栏、底栏、计时框、横幅和结算标题底可九宫格；卡框、皇冠、能量底槽和地面贴花不能任意拉伸。十格能量底槽固定 912×56。
- EnergyFill、EnergyFill_Gold、HpBar_Fill、Shield_Fill、TowerBar_Fill 与全部地面贴花是白色，代码染色。Gold 保留规定文件名但仍是白色遮罩，金色用 `#FFD45C`。
- DeployGrid/NoDeploy 为 96×96 可平铺贴花；其余贴花等比缩放。BeamLine 的长方向为本地 +Y；Fan100 朝上，角度100°；运行时按朝向旋转。DeployRing/DropWarn 为静态圈，计时和收缩由代码控制，不能把一张静态 PNG 当成已完成动画。
- 所有切图不烘焙文字，包括 X2（空角标底，实时画“×2”）；皇冠空/蓝/红为96×80。StatusIcon_Placeholder 为44×44占位。
- 导入 Sprite/Single、Full Rect、PPU100、Bilinear、sRGB、无 Mipmap、无压缩。只有白色遮罩染色，装甲材质保持白 tint。
- 卡框、黄/白按钮与模态面板复用 `../../../deck/handoff/armor-r02/sprites/`。B05 红色按钮在本轮效果图中示意，后续可复用 T2 match-r01 的红色按钮。

## 效果图

`../../mockups/r03/` 含 B03 四帧、B03a/b/c、B04 胜/负/平、B05、C13，共12张1080×2340图。文字独立于本切图包，SVG 保留可编辑构图。B04比分明确为“我方 : 对手”，上方是AI皇冠、下方是我方皇冠。返回按钮依33新流程使用“返回大厅”，覆盖31旧文案“返回卡组”。

## 验证与限制

已做PNG解码、尺寸、白色染色遮罩和清单完整性检查，详见 validation.json；已检查离线效果图。未做网页/真机/Unity验收；未修改原型或CSS。效果图使用原生SVG组件重组，非生成图裁切；imagegen候选未采用。
