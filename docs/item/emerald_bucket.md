---
outline: 'deep'
---

# 绿宝石桶

## 来源

绿宝石桶只能通过合成获取。

## 用途

对着方块右键绿宝石桶时，如果绿宝石桶是空桶状态，方块会被破坏但不掉落，同时绿宝石桶“装起”方块，且绿宝石桶显示“装着xx的桶”。

此类绿宝石桶的NBT：
```
{
    block_state: {
        Properties: {
            // 方块状态
        },
        Name: // 方块ID
    }
}
```

如果绿宝石桶不是空桶状态，则“放下”方块。但是“放下”的方块不具有碰撞箱等方块特征，是“假方块”。其原理是利用`方块展示实体`展示无法通过任何形式交互的方块。

绿宝石桶创建方块展示实体的原理是写入NBT，具体地说是将绿宝石桶的NBT“转移”到假方块上。

对应实现代码：

```java
ItemStack stack = context.getStack();
NbtCompound nbt = stack.getOrCreateNbt();
World world = context.getWorld();
if (nbt.contains("block_state")) { // 非空桶
    Vec3i vec3i = context.getBlockPos().offset(context.getSide()); // “放下”的位置
    DisplayEntity.BlockDisplayEntity blockDisplay = new DisplayEntity.BlockDisplayEntity(EntityType.BLOCK_DISPLAY, world);
    NbtCompound nbt1 = new NbtCompound();
    nbt1.put("block_state", nbt.get("block_state"));
    blockDisplay.readNbt(nbt1);                // 读取自定义的NBT
    blockDisplay.setPosition(Vec3d.of(vec3i)); // 设置假方块位置
    world.spawnEntity(blockDisplay);           // 生成假方块
    nbt.remove("block_state");                 // 移除绿宝石桶NBT
    stack.setNbt(nbt);                         // 设置新的NBT
    return ActionResult.SUCCESS;
} else { // 空桶
    BlockPos pos = context.getBlockPos();
    BlockState state = world.getBlockState(pos);
    nbt.put("block_state", NbtHelper.fromBlockState(state));
    stack.setNbt(nbt);            // 添加方块信息
    world.breakBlock(pos, false); // 破坏方块且不掉落
    return ActionResult.SUCCESS;
}
```

## 合成方法

- A：`绿宝石`
- B：绿宝石桶

```
|   |   |   |     ---
| A |   | A | -> | B |
|   | A |   |     ---
```

## 假方块

假方块实际上是方块展示实体。通过带有 `block_state` 标签的NBT，指定了方块展示实体展示的内容。

Mixin 对其进行了修改。当方块展示实体的位置上有真正的方块（即非`空气`）时，方块展示实体掉落自身。也就是说，通过“装起”方块，再“放下”，最后用方块将其替换，可以获取任何方块，包括`基岩`等。

对应实现代码：
```java
// 形式看起来怪异请见谅，写在Mixin中
Entity this_ = (Entity)(Object)this;
if ((Entity)(Object)this instanceof BlockDisplayEntity blockDisplay) {
    World world = this_.getWorld();
    if (!world.getBlockState(this_.getBlockPos()).isAir()) {
        NbtCompound nbt = new NbtCompound();
        blockDisplay.writeNbt(nbt);
        Block block = Registries.BLOCK.get(Identifier.tryParse(((NbtCompound)nbt.get("block_state")).getString("Name")));
        blockDisplay.dropStack(block.asItem().getDefaultStack());
        this_.discard();
    }
}
```