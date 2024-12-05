---
outline: 'deep'
---

# 绿宝石桶

## 来源

绿宝石桶只能通过合成获取。

## 用途

对着方块右键绿宝石桶时，如果绿宝石桶是空桶状态，方块会被破坏但不掉落，同时绿宝石桶“装起”方块，且绿宝石桶显示“装着xx的桶”。对应实现代码：

```java
BlockPos pos = context.getBlockPos();
BlockState state = world.getBlockState(pos);
nbt.put("block_state", NbtHelper.fromBlockState(state));
stack.setNbt(nbt);
world.breakBlock(pos, false);
```

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

## 合成方法

- A：`绿宝石`
- B：绿宝石桶

```
|   |   |   |     ---
| A |   | A | -> | B |
|   | A |   |     ---
```
